import * as React from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, Pressable, Image, KeyboardAvoidingView, ScrollView } from "react-native"
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

  useEffect(()=>{
    if(!messagesHistory[chatID]?.messages?.length){return}
    ref.current?.scrollToEnd({animated: false})
    console.log(chatStore.activeChat)
  }, [messagesHistory[chatID]?.messages?.length])

  const sendNewMessage = async() => {
    if(!chatStore.userChats[chatID]?.inputMessage || !socket){return}
    tryCatch(async()=>{
      const sentMessage = await netRequestHandler(()=>sendMessageAPI(chatID, user._id, chatStore.userChats[chatID]?.inputMessage), warning)
      socket.emit('newMessage', {message: sentMessage.data, recipientID: chatStore.activeChat.friend._id})
      addMessage(sentMessage.data)
      chatStore.setInputMessage({chatID, message: ""})
      chatStore.setChatMessageTime({chatID, time: sentMessage.data.createdAt})
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

  return(
    <View style={styles.chatBox}>
      <View style={styles.topPanel}>
        {chatStore.activeChat?.friend?.avatar ? <Image source={{uri:chatStore.activeChat?.friend?.avatar}} style={[styles.avatar, {margin: 5}]}/> : <></>}
        <Text style={styles.displayedName}>{chatStore.activeChat?.friend?.displayedName}</Text>
        <Text style={styles.usertag}>{chatStore.activeChat?.friend?.usertag}
          {messagesHistory[chatID]?.isTyping 
          ? <Text style={styles.typing}><Icon.AnimatedPen/>Typing...</Text> 
          : <></>}
        </Text>
      </View>
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <ScrollView
          ref={ref}
          contentContainerStyle={{alignItems: 'flex-end'}}>
          <View style={styles.chatMesseges}>
            {messagesHistory[chatID]?.messages?.map((message: message, index: number) => {
              const date = new Date(message.createdAt)
              const nextMessage = {
                date: messagesHistory[chatID]?.messages[index+1]?.createdAt,
                samePerson: messagesHistory[chatID]?.messages[index+1]?.senderID == message.senderID,
                differentDate: isDifferentDay(message.createdAt, messagesHistory[chatID]?.messages[index+1]?.createdAt),
                minutes: differenceInMinutes(message.createdAt, messagesHistory[chatID]?.messages[index+1]?.createdAt)
              }
              return(
                <Fragment key={message._id}>
                  <View style={message.senderID == user._id ? styles.rightMessage : styles.leftMessage}>
                    <View style={message.senderID == user._id ? styles.rightText : styles.leftText}>
                      <Text style={[{color: '#ffffff', fontSize: 15}]}>{message.text}</Text>
                      <Text style={[styles.timeSent, message.senderID == user._id ? {textAlign: 'right'} : {textAlign: 'left'}]}>{calculateDate(date.toString(), 'time')}</Text>
                    </View>
                  </View>
                  {(!nextMessage.samePerson && !nextMessage.differentDate) || nextMessage.minutes > 5 ? <View style={styles.spacing}/> : <></>}
                  {nextMessage.differentDate ? <View style={styles.date}><View style={styles.line}/><Text style={styles.dateText}>{calculateDate(nextMessage.date, 'date')}</Text><View style={styles.line}/></View> : <></>}
                </Fragment>
              )})}
            {!messagesHistory[chatID]?.messages?.length ? <Text style={[{color: '#ffffff', fontSize: 15, textAlign: 'center'}]}>The chat is empty!</Text> : <></>}
          </View>
        </ScrollView>
        <View style={styles.viewMessages}>
          <TextInput 
            style={styles.inputMessages}
            onChangeText={(e)=>{chatStore.setInputMessage({chatID, message: e});startTyping()}}
          />
          <Pressable onPress={sendNewMessage}><Icon.SendArrow/></Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  chatBox: {
    overflow: 'hidden',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#18191e',
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
    color: '#ffffff',
  },
  usertag: {
    fontSize: 14,
    color: '#ffffff50',
  },
  typing: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    top: 45,
    left: 420,
    opacity: 0.4,
    fontSize: 13,
  },
  chatContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMesseges: {
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  rightMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
    borderRadius: 10,
  },
  leftMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 10,
  },
  rightText: {
    padding: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#d06af838',
  },
  leftText: {
    padding: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#ffffff11',
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
    color: '#ffffff40',
    fontSize: 13,
  },
  spacing: {

  },
  line: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ffffff1a',
  },
  timeSent: {
    fontSize: 13,
    color: '#ffffff50',
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
    width: '85%',
    padding: 5,
    fontSize: 13,
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
  },
})