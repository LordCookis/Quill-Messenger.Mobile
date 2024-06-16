import * as React from 'react'
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import Icon from '../../assets/Icons'
import { fetchUserByIdAPI } from '../../api/user-api'
import { useChatStore } from '../../stores/chat-store'
import { useAccountStore } from '../../stores/account-store'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../../context/socket-context'
import { WarningContext } from '../../lib/warning/warning-context'
import { tryCatch } from '../../utils/try-catch'
import { netRequestHandler } from '../../utils/net-request-handler'
import { warningHook } from '../../lib/warning/warning-context'
import { calculateDate } from '../../utils/calculate-date'
import { stylesData } from '../../styles/stylesData'
import FastImage from 'react-native-fast-image'
import { useCounterStore } from '../../stores/counter-store'
import { deleteGroupChatAPI } from '../../api/group-api'
import { deleteChatAPI } from '../../api/chat-api'

type MessageData = {
  senderID: string
  type: string
  text: string | { format?: string; code?: string; text?: string }
  time: string
}

export default function Dialog({chat, messagesStore, navigation}:any){
  const [opponentData, setOpponentData] = useState<any>()
  const {activeChat, setActiveChat} = useChatStore()
  const socket: Socket | any = useContext(SocketContext)
  const user = useAccountStore()
  const warning = useContext<warningHook>(WarningContext)
  const [messageData, setMessageData] = useState<MessageData>({
    senderID: "",
    type: "",
    text: "",
    time: "",
  })
  const counterStore = useCounterStore()
  const [deleteId, setDeleteId] = useState<string>("")
  const [deleted, setDeleted] = useState(false)
  const chatStore = useChatStore()

  const selectChat = () => {
    setActiveChat({chat: chat, friend: opponentData})
    counterStore.resetCounter(chat._id)
    navigation.navigate('DialogChat', {chatID: chat._id})
  }

  useEffect(()=>{
    if(opponentData || !socket?.connected){return}
    const userID = chat?.members[0] != user._id ? chat.members[0] : chat.members[1]
    tryCatch(async()=>{
      const result = await netRequestHandler(()=>fetchUserByIdAPI(userID, user.host), warning)
      setOpponentData(result.data)
    })
  }, [opponentData, socket?.connected])

  useEffect(()=>{
    if(!messagesStore?.messages?.length){return}
    setMessageData({
      senderID: messagesStore?.messages[messagesStore?.messages.length-1].senderID,
      type: messagesStore?.messages[messagesStore?.messages.length-1].type,
      text: messagesStore?.messages[messagesStore?.messages.length-1].text,
      time: `${calculateDate(messagesStore?.messages[messagesStore?.messages.length-1].createdAt, 'count')}`
    })
  }, [messagesStore])

  const Typing = () => <View style={styles.typing}><Icon.AnimatedPen/><Text style={{color:stylesData.time, fontFamily: 'monospace'}}> Пишет...</Text></View> 
  const Draft = () => <><Text style={styles.draft}>{"Черновик: "}</Text>{messagesStore?.inputMessage}</>
  const Message = () => {
    const renderMessage = () => {
      const truncateText = (text: string) => {
        return (<Text style={{color:stylesData.time, fontFamily: 'monospace'}}>{text.length > 25 ? text.substring(0, 25) + '...' : text}</Text>) 
      }
      if (messageData?.type === 'text' && typeof messageData.text === 'object') {
        const textContent = messageData.text?.text;
        return textContent?.length ? truncateText(textContent) : <Text style={{color:stylesData.time, fontFamily: 'monospace'}}>Сообщений пока нет...</Text>
      }
      if (messageData?.type === 'media' && typeof messageData.text === 'object') {
        return (<FastImage source={{uri: messageData.text?.code}} style={styles.image}/>)
      }
      if (messageData?.type === 'media-text' && typeof messageData.text === 'object' && messageData.text.text) {
        return (<View style={{height: 20, flexDirection: 'row', alignItems: 'center'}}><FastImage source={{uri: messageData.text?.code}} style={styles.image}/><Text style={{color:stylesData.time, marginLeft:5, fontFamily: 'monospace'}}>{truncateText(messageData.text.text)}</Text></View>)
      }
      return <Text style={{color:stylesData.time, fontFamily: 'monospace',}}>Сообщений пока нет...</Text>
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...styles.sentFromMe, fontFamily: 'monospace'}}>{messageData.senderID == user._id ? 'Вы: ' : ''}</Text>
        {messageData?.type === 'media' && typeof messageData.text === 'object' ? (
          <View>{renderMessage()}</View>
        ) : (
          <Text>{renderMessage()}</Text>
        )}
      </View>
    )
  }

  const deleteChat = async(chatInfo: {_id: string, members: string[], type: 'group' | undefined}, opponentData: any) => {
    if('image' in chatInfo){ await deleteGroupChatAPI(deleteId, user.host) }
    else { await deleteChatAPI(deleteId, user.host) }
    socket.emit('removeChat', {chatID: deleteId, recipientID: chatInfo.members})
    counterStore.resetCounter(deleteId)
    if(chatStore.activeChat.chat._id == deleteId){navigation.navigate('DialogList')}
    chatStore.removeChat({chatID: deleteId})
    setDeleteId("")
  }

  return(
    <Pressable onPress={selectChat} onLongPress={()=>{setDeleted(true), setDeleteId(chat._id)}}>
    <View style={styles.messageBlock}>
    {opponentData?.avatar.code ? <FastImage style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri:opponentData?.avatar.code}}/> : <View style={[{height: 40, width: 40, borderRadius: 50}]}/>}
      <View style={styles.messageContent}>
        <View style={styles.top}>
          <Text style={styles.name}>{opponentData?.displayedName}</Text>
          <Text style={styles.time}>{messageData?.time?.length ? messageData.time : ""}</Text>
        </View>
        <View style={styles.bottom}>
          {chat?.isTyping ?
            <Typing/> :
            chat?.inputMessage?.length && activeChat.chat._id != chat._id ?
              <Draft/> :
              <Message/>
          }
          {counterStore?.counters[chat._id]?.counter ? <Text style={styles.messagesCounter}>{counterStore.counters[chat._id].counter}</Text> : null}
        </View>
      </View>
    </View>
    {deleted &&
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}>
        <Pressable style={{...styles.modal, backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={()=>setDeleted(false)}>
          <View style={{...styles.conteiner, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.deleteCont}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', marginBottom: 10}}>Удалить чат {opponentData.displayedName}?</Text>
              <Text style={{fontSize: 18, color: '#fff', marginBottom: 10}}>Вы уверены, что хотите удалить этот чат? Этот чат невозможно будет восстановить!</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, color: '#2692E5'}} onPress={()=>setDeleted(false)}>Отмена</Text>
                <Text style={{fontSize: 20, color: stylesData.error}} onPress={()=>deleteChat(chat, opponentData)}>Удалить</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  messageBlock: {
    height: stylesData.height*0.075,
    width: stylesData.width / 1.1,
    paddingVertical: 10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stylesData.accent1,
    borderRadius: 10,
  },
  messageContent: {
    marginLeft: 10,
    width: '80%',
    display: 'flex',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: stylesData.white,
    fontFamily: 'monospace',
  },
  time: {
    color: stylesData.time,
    fontFamily: 'monospace',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    //color: stylesData.time,
  },
  sentFromMe: {
    color: stylesData.appmessage,
  },
  typing: {
    color: stylesData.appmessage,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginRight: 4,
  },
  draft: {
    color: stylesData.error,
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 5,
  },
  messagesCounter: {
    height: 20,
    width: 20,
    fontFamily: 'monospace',
    backgroundColor: stylesData.appmessage,
    borderRadius: 50,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  conteiner: {
    height: '100%',
    paddingVertical: 10,
  },
  modalView: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 9999,
  },
  deleteCont: {
    width: stylesData.width*0.75,
    backgroundColor: stylesData.accent1,
    padding: 15,
    borderRadius: 10,
  },
})