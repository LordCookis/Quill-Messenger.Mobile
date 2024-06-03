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
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker"
import RNFS from 'react-native-fs'

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

export default function DialogChat({route}:any) {
  const {chatID} = route.params
  const chatStore = useChatStore()
  const user = useAccountStore()
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

  useEffect(()=>{
    if(!messagesHistory[chatID]?.messages?.length){return}
    ref.current?.scrollToEnd({animated: false})
  }, [messagesHistory[chatID]?.messages?.length])

  const sendNewMessage = async(type:any) => {
    if((!chatStore.userChats[chatID]?.inputMessage && !image.format) || !socket){return}
    tryCatch(async()=>{
      const sentMessage = await netRequestHandler(()=>sendMessageAPI(
        chatID,
        user._id,
        type,
        type === 'text' ? chatStore.userChats[chatID]?.inputMessage : 
        type === 'media' ? image : {text: chatStore.userChats[chatID]?.inputMessage, ...image}), warning)
      socket.emit('newMessage', {message: sentMessage.data, recipientID: chatStore.activeChat.friend._id})
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
    socket.emit('typing', {state: true, recipientID: chatStore.activeChat.friend._id, chatID})
  }

  const stopTyping = () => {
    if(!socket){return}
    clearTimeout(typingTimer);
    setTypingTimer(setTimeout(() => {
      setIsTyping(false)
      socket.emit('typing', {state: false, recipientID: chatStore.activeChat.friend._id, chatID})
    }, 1000))
  }

  useEffect(() => {
    return() => clearTimeout(typingTimer) // Clear the timeout if the component is unmounted
  }, [typingTimer])

  const pickMedia = async() => {
    try {
      const res = await DocumentPicker.pick({type: ["video/*"]})
      if (res.length > 0) {
        const uri:any = res[0].uri
        const base64 = await RNFS.readFile(uri, 'base64')
        const format = uri.split('.').pop()?.toLowerCase()
        setImage({format: format, code: base64})
        setModal(true)
      }
    } catch (err:any) {
      if (DocumentPicker.isCancel(err)) { console.log('Выбор файла отменен') }
      else { console.log('Ошибка при выборе файла', err.message) }
    }
  }

  return(
    <SafeAreaView style={styles.chatBox}>
      <View style={styles.topPanel}>
        {chatStore.activeChat?.friend?.avatar.format ? <Image source={{uri:`data:image/${chatStore.activeChat?.friend?.avatar.format};base64,${chatStore.activeChat?.friend?.avatar.code}`}} style={[styles.avatar, {margin: 5}]}/> : <></>}
        <Text style={styles.displayedName}>{chatStore.activeChat?.friend?.displayedName}</Text>
        <Text style={styles.usertag}>{chatStore.activeChat?.friend?.usertag}
          {messagesHistory[chatID]?.isTyping 
          ? <Text style={styles.typing}><Icon.AnimatedPen/>Typing...</Text> 
          : <></>}
        </Text>
      </View>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <FlatList
          ref={ref}
          data={messagesHistory[chatID]?.messages || []}
          keyExtractor={(item:any) => item._id}
          renderItem={({item:message, index}:any) => {
            const date = new Date(message.createdAt)
            const nextMessage = {
              date: messagesHistory[chatID]?.messages[index + 1]?.createdAt,
              samePerson: messagesHistory[chatID]?.messages[index + 1]?.senderID == message.senderID,
              differentDate: isDifferentDay(message.createdAt, messagesHistory[chatID]?.messages[index + 1]?.createdAt),
              minutes: differenceInMinutes(message.createdAt, messagesHistory[chatID]?.messages[index + 1]?.createdAt)
            }
            return(
              <Fragment key={message._id}>
                <View style={message.senderID == user._id ? styles.rightMessage : styles.leftMessage}>
                  {message.type === 'text' ?
                    <View style={message.senderID == user._id ? styles.rightText : styles.leftText}>
                      <Text style={[{color: stylesData.white, fontSize: 15}]}>{typeof message.text === 'string' ? message.text : ''}</Text>
                      <Text style={[styles.timeSent, message.senderID == user._id ? {textAlign: 'right'} : {textAlign: 'left'}]}>{calculateDate(date.toString(), 'time')}</Text>
                    </View> :
                    message.type === 'media' ?
                      <Pressable style={[message.senderID == user._id ? styles.rightText : styles.leftText, {padding: 0}]} onPress={()=>setOpenImage({...message.text})}>
                        <Image source={{uri: `data:image/${(message.text as {format: string; code: string}).format};base64,${(message.text as {format:string; code:string}).code}`}} style={styles.messageImage}/>
                      </Pressable> :
                      <View style={[message.senderID == user._id ? styles.rightText : styles.leftText, {padding: 0}]}>
                        <Pressable onPress={()=>setOpenImage({...message.text})}>
                          <Image source={{uri: `data:image/${(message.text as {format:string; code:string; text:string}).format};base64,${(message.text as {format:string; code:string; text:string}).code}`}} style={{...styles.messageImage, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                        </Pressable>
                        <View style={{padding: 5}}>
                          <Text style={[{color: stylesData.white, fontSize: 15, textAlign: 'left', width: (stylesData.width * 0.5) - 10}]}>{(message.text as {format:string; code:string; text:string}).text}</Text>
                          <Text style={[styles.timeSent, message.senderID == user._id ? {textAlign: 'right'} : {textAlign: 'left'}]}>{calculateDate(date.toString(), 'time')}</Text>
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
              <Image source={{uri:`data:image/${image.format};base64,${image.code}`}} style={styles.image}/>
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
          <Image source={{uri:`data:image/${openImage.format};base64,${openImage.code}`}} style={styles.image}/>
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
    justifyContent: 'center',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: stylesData.white,
    top: 45,
    left: 420,
    opacity: 0.4,
    fontSize: 13,
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
})