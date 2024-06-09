import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import Icon from '../../assets/Icons'
import { useAccountStore } from '../../stores/account-store'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../../context/socket-context'
import { WarningContext } from '../../lib/warning/warning-context'
import { useChatStore } from '../../stores/chat-store'
import { warningHook } from '../../lib/warning/warning-context'
import { stylesData } from '../../styles/stylesData'
import { calculateDate } from '../../utils/calculate-date'
import FastImage from 'react-native-fast-image'

type MessageData = {
  senderID: string
  type: string
  text: string | { format?: string; code?: string; text?: string }
  time: string
}

export default function Group({group, messagesStore, navigation}:any){
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
  });

  const selectGroup = () => {
    setActiveChat({chat: group, friend: opponentData})
    navigation.navigate('GroupChat', {chatID: group._id})
  }

  useEffect(()=>{
    if(group.members.length > 2){
      setOpponentData({
        avatar: group.image?.code,
        displayedName: group.name,
        usertag: `${group.members.length} members`,
        type: 'group'
      })
      return
    }
  }, [])

  useEffect(()=>{
    if(!messagesStore?.messages?.length){return}
    setMessageData({
      senderID: messagesStore?.messages[messagesStore?.messages.length-1].senderID,
      type: messagesStore?.messages[messagesStore?.messages.length-1].type,
      text: messagesStore?.messages[messagesStore?.messages.length-1].text,
      time: `${calculateDate(messagesStore?.messages[messagesStore?.messages.length-1].createdAt, 'count')}`
    })
  }, [messagesStore])

  const Typing = () => <Text style={styles.typing}><Icon.AnimatedPen/> Typing...</Text> 
  const Draft = () => <><Text style={styles.draft}>{"Draft: "}</Text>{messagesStore?.inputMessage}</>
  const Message = () => {
    const renderMessage = () => {
      const truncateText = (text: string) => {
        return (<Text style={{height: 20, color:stylesData.time}}>{text.length > 25 ? text.substring(0, 25) + '...' : text}</Text>) 
      }
      if (messageData?.type === 'text' && typeof messageData.text === 'object') {
        const textContent = messageData.text?.text;
        return textContent?.length ? truncateText(textContent) : <Text style={{color:stylesData.time}}>No messages yet...</Text>
      }
      if (messageData?.type === 'media' && typeof messageData.text === 'object') {
        return (<FastImage source={{uri: messageData.text?.code}} style={styles.image}/>)
      }
      if (messageData?.type === 'media-text' && typeof messageData.text === 'object' && messageData.text.text) {
        return (<View style={{height: 20, flexDirection: 'row', alignItems: 'center'}}><FastImage source={{uri: messageData.text?.code}} style={styles.image}/><Text style={{color:stylesData.time, marginLeft:5}}>{truncateText(messageData.text.text)}</Text></View>)
      }
      return <Text style={{color:stylesData.time}}>No messages yet...</Text>
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.sentFromMe}>{messageData.senderID == user._id ? 'You: ' : ''}</Text>
        {messageData?.type === 'media' && typeof messageData.text === 'object' ? (
          <View>{renderMessage()}</View>
        ) : (
          <Text>{renderMessage()}</Text>
        )}
      </View>
    )
  }

  return(
    <Pressable onPress={selectGroup}>
    <View style={styles.messageBlock}>
    {group.image?.code ? <FastImage style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri:group?.image.code}}/> : <></>}
      <View style={styles.messageContent}>
        <View style={styles.top}>
          <Text style={styles.name}>{group?.name}</Text>
          <Text style={styles.time}>{messageData?.time?.length ? messageData.time : ""}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.message}>
            {group?.isTyping ?
              <Typing/> :
              group?.inputMessage?.length && activeChat.chat._id != group._id ?
                <Draft/> :
                <Message/>
            }
          </Text>
        </View>
      </View>
    </View>
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
    color: '#ffffff'
  },
  time: {
    color: '#808080'
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    color: '#808080',
  },
  sentFromMe: {
    color: '#c577e4',
  },
  status: {
    marginTop: 5,
  },
  typing: {
    color: '#c577e4',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    marginRight: 4,
  },
  draft: {
    color: '#e73f3f',
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 5,
  },
})