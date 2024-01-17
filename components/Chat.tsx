import * as React from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import Icon from "../assets/Icons"
import { useChatStore } from "../stores/chat-store"
import { useMessageStore } from '../stores/messages-store'
import { sendMessageAPI } from "../api/message-api"
import { WarningContext } from "../lib/warning/warning-context"
import { useAccountStore } from "../stores/account-store"
import { Socket } from 'socket.io-client'
import { SocketContext } from '../context/socket-context'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'

export default function Chat({route}:any) {
  const {chatID} = route.params
  const {activeChat}:any = useChatStore()
  const user = useAccountStore()
  const warning:any = useContext(WarningContext)
  const socket: Socket | any = useContext(SocketContext)
  const ref = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping]:any = useState(false)
  const [typingTimer, setTypingTimer]:any = useState(null)
  const {messagesHistory, addMessage, setInputMessage}:any = useMessageStore()

  useEffect(()=>{
    if(!messagesHistory[chatID]?.messages?.length){return}
    ref.current?.scrollIntoView({behavior: "smooth", block: "end"})
  }, [messagesHistory[chatID]?.messages?.length])

  const sendNewMessage = async() => {
    if(!messagesHistory[chatID]?.inputMessage || !socket){return}
    tryCatch(async()=>{
      const sentMessage = await netRequestHandler(sendMessageAPI(chatID, user._id, messagesHistory[chatID]?.inputMessage), warning)
      socket.emit('newMessage', {message: sentMessage.data, recipientID: activeChat.friend._id})
      addMessage(sentMessage.data)
      setInputMessage({chatID, message: ""})
    })
  }

  const startTyping = () => {
    if(!socket){return}
    clearTimeout(typingTimer)
    stopTyping()
    if(isTyping){return}
    setIsTyping(true)
    socket.emit('typing', {state: true, recipientID: activeChat.friend._id, chatID})
  }

  const stopTyping = () => {
    if(!socket){return}
    clearTimeout(typingTimer)
    setTypingTimer(setTimeout(() => {
      setIsTyping(false)
      socket.emit('typing', {state: false, recipientID: activeChat.friend._id, chatID})
    }, 1000))
  }

  useEffect(() => {
    return() => clearTimeout(typingTimer) // Clear the timeout if the component is unmounted
  }, [typingTimer])

  return(
    <View style={styles.chatBox}>
      <View style={styles.topPanel}>
        {activeChat?.friend?.avatar ? <Image source={{uri:activeChat?.friend?.avatar}} alt="avatar" height={40} width={40} style={[styles.avatar, {margin: 5}]}/> : <></>}
        <Text style={styles.displayedName}>{activeChat?.friend?.displayedName}</Text>
        <Text style={styles.usertag}>{activeChat?.friend?.usertag}
          {messagesHistory[chatID]?.isTyping 
          ? <Text style={styles.typing}><Icon.AnimatedPen/>Typing...</Text> 
          : <></>}
        </Text>
      </View>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <ScrollView>
          <View style={styles.chatMesseges}>
            {messagesHistory[chatID]?.messages?.map((message: any) => {
              const date = new Date(message.createdAt)
              return (
                <Fragment key={message._id}>
                  <View id={message._id} style={message.senderID == user._id ? styles.myMessage : styles.notMyMessage}>
                    <Image
                      source={message.senderID == user._id ? {uri: user.avatar} : {uri: activeChat?.friend?.avatar}}
                      alt="avatar"
                      style={styles.avatar}
                      width={30}
                      height={30}/>
                    <View style={message.senderID == user._id ? styles.myText : styles.notMyText}>
                      <Text style={[{color: '#ffffff', fontSize: 15}]}>{message.text}</Text>
                      <Text style={[styles.timeSent, message.senderID == user._id && {textAlign: 'right'}]}>{`${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`}</Text>
                    </View>
                  </View>
                </Fragment>
              )})}
            {!messagesHistory[chatID]?.messages?.length ? <Text style={[{color: '#ffffff', fontSize: 15, textAlign: 'center'}]}>The chat is empty!</Text> : <></>}
          </View>
        </ScrollView>
        <View style={styles.viewMessages}>
          <TextInput 
            value={messagesHistory[chatID]?.inputMessage || ""}
            style={styles.inputMessages}
            onChangeText={(e)=>{setInputMessage({chatID, message: e});startTyping()}}
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
    backgroundColor: '#17191f',
  },
  topPanel: {
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
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
  myMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
    borderRadius: 10,
  },
  notMyMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 10,
  },
  myText: {
    padding: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#3e3b54',
  },
  notMyText: {
    padding: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#2b2b33',
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