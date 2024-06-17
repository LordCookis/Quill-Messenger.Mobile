import * as React from 'react'
import { createContext, useEffect, useContext, useState } from "react"
import Loading from '../components/other/Loading'
import { fetchLatestMessageAPI } from "../api/message-api"
import { useNavigation } from '@react-navigation/native'
import { chat, useChatStore } from '../stores/chat-store'
import { useMessageStore } from '../stores/messages-store'
import io, { Socket } from "socket.io-client"
import { message } from '../stores/messages-store'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'
import { WarningContext, warningHook } from '../lib/warning/warning-context'
import { useAccountStore } from '../stores/account-store'
import { useCounterStore } from '../stores/counter-store'

export const SocketContext: any = createContext(null)

export default function SocketWrapper({children, _id}: {children: React.ReactNode, _id: string}){
  const chatStore = useChatStore()
  const warning = useContext<warningHook>(WarningContext)
  const user = useAccountStore()
  const counterStore = useCounterStore()
  const {activeChat} = useChatStore()
  const messagesStore = useMessageStore()
  const accountStore = useAccountStore()
  const [socket, setSocket] = useState<Socket | null | any>()
  const navigation = useNavigation()
  const [route, setRoute] = useState(navigation.getState()?.routes[navigation.getState()?.routes.length - 1].name)

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => { setRoute(navigation.getState()?.routes[navigation.getState()?.routes.length - 1].name) })
    return unsubscribe
  }, [navigation])

  useEffect(()=>{
    const newSocket = io(`ws://${user.host}/?_id=${_id}`, {
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 100
    })
    newSocket.on('connect', ()=> {
      console.log("Connected to the server!")
      newSocket["connected"] = true
      setSocket(newSocket)
    })
    newSocket.on('connect_error', (err: any)=> {
      newSocket["connected"] = false
      setSocket({...socket, connected: false})
    })
    newSocket.on('reconnecting', ()=>{
      setSocket({...socket, connected: false})
    })
    newSocket.on('reconnect', ()=>{
      newSocket["connected"] = true
      setSocket({...socket, connected: true})
    })
    newSocket.on('disconnect', ()=> {
      console.log("Disconnected from the server")
      newSocket["connected"] = false
      setSocket({...socket, connected: false})
    })
    return() => {
      newSocket.disconnect()
      newSocket.removeAllListeners()
    }
  }, [user.connect])

  useEffect(()=>{
    if(!socket?.connected){return}
    socket.on('newMessage', (data: message) => {
      console.log("ADDING TO COUNTER")
      console.log(data.chatID)
      counterStore.addCounter(data.chatID)
      if(!chatStore?.userChats[data.chatID]?._id){
        chatStore.addNewChat({
          _id: data.chatID,
          members: [data.senderID, accountStore._id],
          inputMessage: '',
        })
        messagesStore.setChatHistory({chatID: data.chatID, messages: []})
      }
      chatStore.setChatMessageTime({chatID: data.chatID, time: data.createdAt})
      messagesStore.addMessage(data)
    })
    socket.on('typing', (data: {chatID: string, state: boolean}) => {
      if(!chatStore?.userChats[data.chatID]?._id){return}
      console.log("TYPING", data.state)
      chatStore.setIsTyping({chatID: data.chatID, state: data.state})
    })
    socket.on('removeChat', (data: {chatID: string, recipientID: string}) => {
      console.log("REMOVE CHsAT", data)
      counterStore?.counters[data.chatID]?.counter > 0 && counterStore.decCounter(data.chatID)
      chatStore.removeChat({chatID: data.chatID})
    })
    socket.on('removeMessage', (data: message) => {
      messagesStore.removeMessage(data)
    })
    socket.on('addGroup', (data: chat) => {
      chatStore.addNewChat(data)
    })
    socket.on('editGroup', (data: {_id: string, name: string, image: {format: string, code: string}}) => {
      chatStore.editChat({_id: data._id, name: data.name, image: data.image})
      if(chatStore.activeChat.chat._id == data._id){
        chatStore.setActiveChat({chat: {...chatStore.activeChat.chat, name: data.name, image: data.image}, friend: {...chatStore.activeChat.friend, displayedName: data.name, image: data.image}})
      }
      accountStore.incTrigger()
    })
    socket.on('userDeleted', (data: {userID: string}) => {
      console.log("REMOVE user", data)
      Object.keys(chatStore.userChats).forEach((chatID) => {
        if(chatStore.userChats[chatID]?.members.includes(data.userID)){
          counterStore.resetCounter(chatID)
          chatStore.removeChat({chatID: chatID})
        }
      })
    })
    return () => {
      socket.off('newMessage')
      socket.off('removeChat')
      socket.off('typing')
      socket.off('addGroup')
      socket.off('userDeleted')
      socket.off('typing')
    }
  }, [socket, activeChat, Object.keys(chatStore.userChats).length])

  useEffect(()=>{
    fillMessagesPreview()
  }, [chatStore.userChats])

  const fillMessagesPreview = async() => {
    Object.keys(chatStore.userChats).map((chat: string) => {
      if(messagesStore?.messagesHistory[chat]?.messages?.length){return}
      tryCatch(async()=>{
        const latestMessage = await netRequestHandler(()=>fetchLatestMessageAPI(chatStore.userChats[chat]._id, user.host), warning)
        messagesStore.setChatHistory({chatID: chat, messages: latestMessage.data.reverse()})
      })
    })
  }

  return(
    <SocketContext.Provider value={socket}>
      {!socket?.connected && route != "Login" && route != undefined ? <Loading/> : <></>}
      {children}
    </SocketContext.Provider>
  )
}
