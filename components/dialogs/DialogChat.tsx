import * as React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Image, KeyboardAvoidingView, FlatList, SafeAreaView, Modal } from "react-native"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import Icon from "../../assets/Icons"
import { useChatStore } from "../../stores/chat-store"
import { message, useMessageStore } from '../../stores/messages-store'
import { sendMessageAPI } from "../../api/message-api"
import { WarningContext } from "../../lib/warning/warning-context"
import { useAccountStore } from "../../stores/account-store"
import { Socket } from 'socket.io-client'
import { SocketContext } from '../../context/socket-context'
import { tryCatch } from '../../utils/try-catch'
import { netRequestHandler } from '../../utils/net-request-handler'
import { warningHook } from '../../lib/warning/warning-context'
import { calculateDate, differenceInMinutes, isDifferentDay } from '../../utils/calculate-date'
import { friend } from '../../stores/chat-store'
import { userData } from '../../types/types'
import { stylesData } from '../../styles/stylesData'
import ImagePicker from 'react-native-image-crop-picker'
import FastImage from 'react-native-fast-image'
import { removeMessageAPI } from '../../api/message-api'
import { useCounterStore } from '../../stores/counter-store'

type messageData = {
  message: message,
  nextMessage: {
    date: string,
    samePerson: boolean,
    differentDate: boolean,
    minutes: number
  },
  user: userData,
  opponent: friend,
  date: Date
}

export default function DialogChat({navigation, route}:any) {
  const {chatID} = route.params
  const chatStore = useChatStore()
  const user = useAccountStore()
  const warning = useContext<warningHook>(WarningContext)
  const socket: Socket | any = useContext(SocketContext)
  const ref = useRef<any>(null)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [typingTimer, setTypingTimer] = useState<any>(null)
  const {messagesHistory, addMessage, removeMessage}:any = useMessageStore()
  const [messege, setMessege] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [image, setImage] = useState<any>({format: '', code: ''})
  const [openImage, setOpenImage] = useState<any>({format: '', code: ''})
  const [deleted, setDeleted] = useState<any>(null)
  const [openTab, setOpenTab] = useState<boolean>(false)
  const counterStore = useCounterStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) { ref.current.scrollToEnd({animated: false}) }
    }, 250)
    return () => clearTimeout(timer)
  }, [messagesHistory[chatID]?.messages])

  const sendNewMessage = async(type:any) => {
    if((!chatStore.userChats[chatID]?.inputMessage && !image.format) || !socket){return}
    if(type === 'text' && chatStore.userChats[chatID]?.inputMessage.trim() === ''){
      chatStore.setInputMessage({chatID, message: ""})
      setMessege('')
      return
    }
    tryCatch(async()=>{
      const sentMessage = await netRequestHandler(()=>sendMessageAPI(
        chatID,
        user._id,
        type,
        type === 'text' ? {text: chatStore.userChats[chatID]?.inputMessage} : 
        type === 'media' ? image : {text: chatStore.userChats[chatID]?.inputMessage, ...image}, user.host), warning)
      socket.emit('newMessage', {message: sentMessage.data, recipientID: [chatStore.activeChat.friend._id]})
      addMessage(sentMessage.data)
      chatStore.setInputMessage({chatID, message: ""})
      chatStore.setChatMessageTime({chatID, time: sentMessage.data.createdAt})
      setModal(false)
      setMessege('')
      setImage({format: '', code: ''})
    })
  }

  const startTyping = () => {
    if(!socket){return}
    clearTimeout(typingTimer)
    stopTyping()
    if(isTyping){return}
    setIsTyping(true)
    socket.emit('typing', {state: true, recipientID: [chatStore.activeChat.friend._id, chatID]})
  }

  const stopTyping = () => {
    if(!socket){return}
    clearTimeout(typingTimer);
    setTypingTimer(setTimeout(() => {
      setIsTyping(false)
      socket.emit('typing', {state: false, recipientID: [chatStore.activeChat.friend._id, chatID]})
    }, 1000))
  }

  useEffect(() => {
    return() => clearTimeout(typingTimer)
  }, [typingTimer])

  const pickMedia = async() => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
        includeBase64: true,
        compressImageQuality: 0.8,
        mediaType: 'photo'
      })
      if (image) {
        const file = `data:${image.mime};base64,${image.data}`
        setImage({format: 'png', code: file})
        setModal(true)
      }
    } catch (err:any) {
      console.log('Ошибка при выборе файла', err.message)
    }
  }

  const handleRemoveMessage = async(message: message) => {
    tryCatch(async() => {
      await netRequestHandler(()=>removeMessageAPI({_id: message._id}, user.host), warning)
      socket.emit('removeMessage', {messageID: message._id, chatID: chatID, recipientID: chatStore.activeChat.chat.members})
      removeMessage(message)
      setDeleted(null)
    })
  }

  const Typing = () => <Text style={styles.typing}><Icon.AnimatedPen/> Пишет...</Text> 

  return(
    <SafeAreaView style={styles.chatBox}>
      <View style={styles.topPanel}>
        <Pressable onPress={()=>{navigation.goBack();counterStore.resetCounter(chatID)}} style={{marginRight: 38}}><Icon.Arrow color={stylesData.rightMessage} style={{transform:[{rotate: '180deg'}], margin: 10}}/></Pressable>
        <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>setOpenTab(true)}>
          {chatStore.activeChat?.friend?.avatar.code ? <FastImage source={{uri:chatStore.activeChat?.friend?.avatar.code}} style={[styles.avatar, {margin: 5}]}/> : <View style={[styles.avatar, {margin: 5}]}/>}
          <View>
            <Text style={styles.displayedName}>{chatStore.activeChat?.friend?.displayedName}</Text>
            <Text style={styles.usertag}>{String(chatStore.activeChat?.friend?.usertag)}
            </Text>
          </View>
        </Pressable>
        {chatStore.userChats[chatID]?.isTyping ? <Typing/> : <View style={{width: 79}}/>}
      </View>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <FlatList
          ref={ref}
          overScrollMode="never"
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={messagesHistory[chatID]?.messages || []}
          keyExtractor={(item:any) => item._id}
          renderItem={({item:message, index}:any) => {
            const date = new Date(message.createdAt)
            const nextMessage = {
              date: messagesHistory[chatID]?.messages[index+1]?.createdAt,
              samePerson: messagesHistory[chatID]?.messages[index+1]?.senderID == message.senderID,
              differentDate: isDifferentDay(message.createdAt, messagesHistory[chatID]?.messages[index+1]?.createdAt),
              minutes: differenceInMinutes(message.createdAt, messagesHistory[chatID]?.messages[index+1]?.createdAt),
              doesNextExist: messagesHistory[chatID]?.messages[index+1] ? true : false
            }
            return(
              <Fragment key={message._id}>
                <Pressable style={message.senderID == user._id ? styles.rightMessage : styles.leftMessage} onLongPress={()=>setDeleted(message.senderID == user._id ? message: null)}>
                  {message.type === 'text' ?
                    <View style={message.senderID == user._id ? styles.rightText : styles.leftText}>
                      <Text style={[{color: stylesData.white, fontSize: 15}]}>{typeof message.text.text === 'string' ? message.text.text : ''}</Text>
                      <Text style={[styles.timeSent, message.senderID == user._id ? {textAlign: 'right'} : {textAlign: 'left'}]}>{calculateDate(date.toString(), 'time')}</Text>
                    </View> :
                    message.type === 'media' ?
                      <Pressable style={[message.senderID == user._id ? styles.rightText : styles.leftText, {padding: 0, backgroundColor: '#00000000'}]} onPress={()=>setOpenImage({...message.text})} onLongPress={()=>{setOpenImage({format: '', code: ''});setDeleted(message.senderID == user._id ? message: null)}}>
                        <FastImage source={{uri:(message.text as {format:string; code:string}).code}} style={styles.messageImage}/>
                      </Pressable> :
                      <View style={[message.senderID == user._id ? styles.rightText : styles.leftText, {padding: 0}]}>
                        <Pressable onPress={()=>setOpenImage({...message.text})} onLongPress={()=>{setOpenImage({format: '', code: ''});setDeleted(message.senderID == user._id ? message: null)}}>
                          <FastImage source={{uri:(message.text as {format:string; code:string; text:string}).code}} style={{...styles.messageImage, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                        </Pressable>
                        <View style={{padding: 5}}>
                          <Text style={[{color: stylesData.white, fontSize: 15, textAlign: 'left', width: (stylesData.width * 0.5) - 10}]}>{(message.text as {format:string; code:string; text:string}).text}</Text>
                          <Text style={[styles.timeSent, message.senderID == user._id ? {textAlign: 'right'} : {textAlign: 'left'}]}>{calculateDate(date.toString(), 'time')}</Text>
                        </View>
                      </View>}
                </Pressable>
                {(!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5 ? <View style={styles.spacing} /> : <></>}
                {nextMessage.differentDate ? <View style={styles.date}><View style={styles.line} /><Text style={styles.dateText}>{calculateDate(nextMessage.date, 'date')}</Text><View style={styles.line} /></View> : <></>}
              </Fragment>
            )
          }}
          ListEmptyComponent={()=><Text style={[{color: stylesData.white, fontSize: 15, textAlign: 'center'}]}>Чат пустой!</Text>}
          contentContainerStyle={{alignItems: 'flex-end', padding: 5}}/>
        <View style={styles.viewMessages}>
          <Pressable onPress={pickMedia}><Icon.Paperclip color={stylesData.rightMessage}/></Pressable>
          <TextInput 
            style={styles.inputMessages}
            value={messege}
            onChangeText={(e)=>{chatStore.setInputMessage({chatID, message: e});startTyping();setMessege(e)}}/>
          <Pressable onPress={()=>sendNewMessage('text')}><Icon.SendArrow/></Pressable>
        </View>
      </KeyboardAvoidingView>
      {modal &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}>
          <Pressable style={styles.modal} onPress={()=>setModal(false)}>
            <View style={styles.conteiner}>
              <FastImage source={{uri:image.code}} style={styles.image} resizeMode={FastImage.resizeMode.contain}/>
              <View style={styles.modalView}>
                <TextInput 
                  style={styles.inputMessages}
                  value={messege}
                  onChangeText={(e)=>{chatStore.setInputMessage({chatID, message: e});startTyping();setMessege(e)}}/>
                <Pressable onPress={()=>sendNewMessage(chatStore.userChats[chatID]?.inputMessage ? 'media-text' : 'media')}><Icon.SendArrow/></Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>}
      {openImage.format &&
        <Modal
        animationType="fade"
        transparent={true}
        visible={true}>
        <Pressable style={styles.modal} onPress={()=>setOpenImage({format: '', code: ''})}>
          <View style={styles.conteiner}>
          <FastImage source={{uri:openImage.code}} style={styles.image} resizeMode={FastImage.resizeMode.contain}/>
          </View>
        </Pressable>
        </Modal>}
      {deleted &&
        <Modal
        animationType="fade"
        transparent={true}
        visible={true}>
        <Pressable style={{...styles.modal, backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={()=>setDeleted(null)}>
          <View style={{...styles.conteiner, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.deleteCont}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', marginBottom: 10}}>Удалить сообщение</Text>
              <Text style={{fontSize: 18, color: '#fff', marginBottom: 10}}>Вы точно хотите удалить это сообщение?</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, color: '#2692E5'}} onPress={()=>setDeleted(null)}>Отмена</Text>
                <Text style={{fontSize: 20, color: stylesData.error}} onPress={()=>handleRemoveMessage(deleted)}>Удалить</Text>
              </View>
            </View>
          </View>
        </Pressable>
        </Modal>}
      {openTab &&
        <Modal
        animationType="fade"
        transparent={true}
        visible={true}>
        <Pressable style={{...styles.modal, backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={()=>setOpenTab(false)}>
          <View style={{...styles.conteiner, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.topInfo}>
              <FastImage source={{uri:chatStore.activeChat?.friend?.avatar.code}} style={styles.topImage} resizeMode={FastImage.resizeMode.contain}/>
              <Text style={{...styles.topText, fontSize: 18}}>{chatStore.activeChat?.friend?.displayedName}</Text>
              <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}><Icon.User/><Text style={{...styles.topText, marginLeft: 5}}>{chatStore.activeChat?.friend?.usertag}</Text></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}><Icon.Calendar/><Text style={{...styles.topText, marginLeft: 5}}>{calculateDate(String(chatStore.activeChat?.friend?.createdAt), 'full')}</Text></View>
              </View>
            </View>
          </View>
        </Pressable>
        </Modal>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  chatBox: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: stylesData.accent2,
  },
  topPanel: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  displayedName: {
    marginRight: 5,
    fontSize: 18,
    color: stylesData.white,
  },
  usertag: {
    fontSize: 14,
    color: stylesData.darkGray,
  },
  typing: {
    color: stylesData.appmessage,
    display: 'flex',
    alignItems: 'center',
  },
  chatContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMesseges: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  rightMessage: {
    width: stylesData.width-20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
    borderRadius: 10,
  },
  leftMessage: {
    width: stylesData.width-20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 10,
  },
  rightText: {
    padding: 5,
    margin: 2,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: stylesData.rightMessage,
  },
  leftText: {
    padding: 5,
    margin: 2,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: stylesData.leftMessage,
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dateText: {
    marginHorizontal: 5,
    color: stylesData.darkGray,
    fontSize: 13,
  },
  spacing: {
    margin: 5,
  },
  messageImage: {
    height: stylesData.width*0.5,
    width: stylesData.width*0.5,
    borderRadius: 10,
  },
  line: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: stylesData.darkGray,
  },
  timeSent: {
    fontSize: 13,
    color: stylesData.gray,
    position: 'relative',
  },
  viewMessages: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputMessages: {
    marginLeft: 5,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '75%',
    padding: 5,
    fontSize: 13,
    borderRadius: 10,
    color: stylesData.white,
    backgroundColor: stylesData.accent1,
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
  image: {
    height: stylesData.height,
    width: stylesData.width,
    resizeMode: 'contain',
  },
  deleteCont: {
    width: stylesData.width*0.7,
    backgroundColor: stylesData.accent1,
    padding: 15,
    borderRadius: 10,
  },
  topInfo: {
    padding: 10,
    height: stylesData.height*0.25,
    width: stylesData.width*0.7,
    backgroundColor: stylesData.accent1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topImage: {
    height: stylesData.height*0.135,
    width: stylesData.height*0.135,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  topText: {
    fontFamily: 'monospace',
    color: '#ccc'
  },
})