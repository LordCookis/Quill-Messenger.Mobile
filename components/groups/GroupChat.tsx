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
import { useUserCache } from '../../stores/user-cache'
import FastImage from 'react-native-fast-image'

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

export default function GroupChat({navigation, route}:any) {
  const {chatID} = route.params
  const chatStore = useChatStore()
  const user = useAccountStore()
  const userCache = useUserCache()
  const warning = useContext<warningHook>(WarningContext)
  const socket: Socket | any = useContext(SocketContext)
  const ref = useRef<any>(null)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [typingTimer, setTypingTimer] = useState<any>(null)
  const {messagesHistory, addMessage}:any = useMessageStore()
  const [messege, setMessege] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [image, setImage] = useState<any>({format: '', code: ''})
  const [openImage, setOpenImage] = useState<any>({format: '', code: ''})

  //useEffect(() => {
  //  if (ref.current) { ref.current.scrollToEnd({animated: false}) }
  //}, [messagesHistory[chatID]?.messages])

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
      socket.emit('newMessage', {message: sentMessage.data, recipientID: [chatStore.activeChat.chat.members[0]]})
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
    return() => clearTimeout(typingTimer) // Clear the timeout if the component is unmounted
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
    } catch (err:any) { console.log('Ошибка при выборе файла', err.message) }
  }

  const Typing = () => <Text style={styles.typing}><Icon.AnimatedPen/> Typing...</Text> 

  return(
    <SafeAreaView style={styles.chatBox}>
      <View style={styles.topPanel}>
        <Pressable onPress={()=>navigation.goBack()} style={{marginRight: 38}}><Icon.Arrow color={stylesData.rightMessage} style={{transform:[{rotate: '180deg'}], margin: 10}}/></Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {chatStore.activeChat?.friend?.avatar ? <Image source={{uri:chatStore.activeChat?.friend?.avatar}} style={[styles.avatar, {margin: 5}]}/> : <></>}
          <View>
            <Text style={styles.displayedName}>{chatStore.activeChat?.friend?.displayedName}</Text>
            <Text style={styles.usertag}>{chatStore.activeChat?.friend?.usertag}</Text>
          </View>
        </View>
        {chatStore.userChats[chatID]?.isTyping ? <Typing/> : <View style={{width: 76.5}}/>}
      </View>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <FlatList
          ref={ref}
          data={[...(messagesHistory[chatID]?.messages || [])].reverse()}
          inverted
          keyExtractor={(item:any) => item._id}
          renderItem={({item:message, index}:any) => {
            if (!userCache.userCache[message.senderID]) { userCache.addUserCache(message.senderID) }
            const date = new Date(message.createdAt)
            const nextMessage = {
              date: messagesHistory[chatID]?.messages[messagesHistory[chatID]?.messages.length - 2 - index]?.createdAt,
              samePerson: messagesHistory[chatID]?.messages[messagesHistory[chatID]?.messages.length - 2 - index]?.senderID == message.senderID,
              differentDate: isDifferentDay(
                message.createdAt,
                messagesHistory[chatID]?.messages[messagesHistory[chatID]?.messages.length - 2 - index]?.createdAt
              ),
              minutes: differenceInMinutes(
                message.createdAt,
                messagesHistory[chatID]?.messages[messagesHistory[chatID]?.messages.length - 2 - index]?.createdAt
              )
            }
            return(
              <Fragment key={message._id}>
                <View style={message.senderID == user._id ? styles.rightMessage : styles.leftMessage}>
                  {message.type === 'text' ?
                  <View style={styles.friend}>
                    {(!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5 ? message.senderID !== user._id ? (<FastImage source={{uri:userCache.userCache[message.senderID]?.avatar.code}} style={[styles.avatar, {margin: 5, marginLeft: 10}]}/>) : (<></>) : <View style={{width: 55}}/>}
                    <View style={message.senderID == user._id ? styles.rightText : styles.leftText}>
                      <Text style={[{color: stylesData.white, fontSize: 15}]}>{typeof message.text.text === 'string' ? message.text.text : ''}</Text>
                      <Text style={[ styles.timeSent, message.senderID == user._id ? { textAlign: 'right' } : { textAlign: 'left' }]}>
                        {((!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5) && message.senderID !== user._id ? `${String(userCache.userCache[message.senderID]?.displayedName)} | ${calculateDate(date.toString(), 'time')}` : `${calculateDate(date.toString(), 'time')}`}
                      </Text>
                    </View>
                  </View> :
                    message.type === 'media' ?
                      <View style={styles.friend}>
                        {(!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5 && message.senderID !== user._id ? message.senderID !== user._id ? (<FastImage source={{uri:userCache.userCache[message.senderID]?.avatar.code}} style={[styles.avatar, {margin: 5, marginLeft: 10}]}/>) : (<></>)  : <View style={{width: 55}}/>}
                        <Pressable style={[message.senderID == user._id ? styles.rightText : styles.leftText, {padding: 0}]} onPress={()=>setOpenImage({...message.text})}>
                          <FastImage source={{uri:(message.text as {format:string; code:string}).code}} style={styles.messageImage} />
                          {((!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5) && message.senderID !== user._id && <Text style={[ styles.timeSent, message.senderID == user._id ? { textAlign: 'right' } : { textAlign: 'left' }, {margin: 2.5, marginHorizontal: 5}]}>
                            {((!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5) && message.senderID !== user._id ? `${String(userCache.userCache[message.senderID]?.displayedName)} | ${calculateDate(date.toString(), 'time')}` : `${calculateDate(date.toString(), 'time')}`}
                          </Text>}
                        </Pressable>
                      </View>  :
                      <View style={styles.friend}>
                        {(!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5 ? message.senderID !== user._id ? (<FastImage source={{uri:userCache.userCache[message.senderID]?.avatar.code}} style={[styles.avatar, {margin: 5, marginLeft: 10}]}/>) : (<></>)  : <View style={{width: 55}}/>}
                        <View style={[message.senderID == user._id ? styles.rightText : styles.leftText, {padding: 0}]}>
                          <Pressable onPress={()=>setOpenImage({...message.text})}>
                            <FastImage source={{uri:(message.text as {format:string; code:string; text:string}).code}} style={{...styles.messageImage, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                          </Pressable>
                          <View style={{padding: 5}}>
                            <Text style={[{color: stylesData.white, fontSize: 15, textAlign: 'left', width: (stylesData.width * 0.5) - 10}]}>{(message.text as {format:string; code:string; text:string}).text}</Text>
                            <Text style={[ styles.timeSent, message.senderID == user._id ? { textAlign: 'right' } : { textAlign: 'left' }]}>
                              {((!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5) && message.senderID !== user._id ? `${String(userCache.userCache[message.senderID]?.displayedName)} | ${calculateDate(date.toString(), 'time')}` : `${calculateDate(date.toString(), 'time')}`}
                            </Text>
                          </View>
                        </View>
                      </View>}
                </View>
                {(!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5 ? <View style={styles.spacing} /> : <></>}
                {nextMessage.differentDate ? <View style={styles.date}><View style={styles.line} /><Text style={styles.dateText}>{calculateDate(nextMessage.date, 'date')}</Text><View style={styles.line} /></View> : <></>}
              </Fragment>
            )
          }}
          ListEmptyComponent={()=><Text style={[{color: stylesData.white, fontSize: 15, textAlign: 'center'}]}>The chat is empty!</Text>}
          contentContainerStyle={{alignItems: 'flex-end', padding: 5}}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}/>
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
              <Image source={{uri:image.code}} style={styles.image}/>
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
          <Image source={{uri:openImage.code}} style={styles.image}/>
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
  friend: {
    marginLeft: -10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})