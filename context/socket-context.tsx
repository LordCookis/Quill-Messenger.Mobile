import * as React from 'react'
import { createContext, useEffect, useContext, useState } from "react"
import Loading from '../components/other/Loading'
import { fetchLatestMessageAPI } from "../api/message-api"
import { useNavigation } from '@react-navigation/native'
import { useChatStore } from '../stores/chat-store'
import { useMessageStore } from '../stores/messages-store'
import io, { Socket } from "socket.io-client"
import { message } from '../stores/messages-store'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'
import { WarningContext, warningHook } from '../lib/warning/warning-context'

export const SocketContext: any = createContext(null)

export default function SocketWrapper({children, _id}: {children: React.ReactNode, _id: string}){
  const chatStore = useChatStore()
  const warning = useContext<warningHook>(WarningContext)
  const messagesStore = useMessageStore()
  const [socket, setSocket] = useState<Socket | null | any>()
  //const navigation = useNavigation()
  //const [route, setRoute] = useState(navigation.getState()?.routes[navigation.getState()?.routes.length - 1].name)

  //useEffect(() => {
  //  const unsubscribe = navigation.addListener('state', () => {
  //    setRoute(navigation.getState()?.routes[navigation.getState()?.routes.length - 1].name)
  //  })
  //  return unsubscribe
  //}, [navigation])

  useEffect(()=>{
    //if(route == 'Login'){return}
    const newSocket = io(`ws://192.168.1.194:4000/?_id=${_id}`, {
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
    return () => {
      newSocket.disconnect()
      newSocket.removeAllListeners()
    }
  }, [])

  useEffect(()=>{
    if(!socket?.connected){return}
    socket.on('newMessage', (data: message) => {
      chatStore.setChatMessageTime({chatID: data.chatID, time: data.createdAt})
      messagesStore.addMessage(data)
    })
    socket.on('typing', (data: {chatID: string, state: boolean}) => {
      chatStore.setIsTyping({chatID: data.chatID, state: data.state})
    })
    return () => {
      socket.off('newMessage')
      socket.off('typing')
    }
  }, [socket])

  useEffect(()=>{
    fillMessagesPreview()
  }, [chatStore.userChats])

  const fillMessagesPreview = async() => {
    Object.keys(chatStore.userChats).map((chat: string) => {
      if(messagesStore?.messagesHistory[chat]?.messages?.length){return}
      tryCatch(async()=>{
        const latestMessage = await netRequestHandler(()=>fetchLatestMessageAPI(chatStore.userChats[chat]._id), warning)
        messagesStore.setChatHistory({chatID: chat, messages: latestMessage.data.reverse()})
      })
    })
  }

  return(
    <SocketContext.Provider value={socket}>
      {/*!socket?.connected && route != "Login" && route != undefined ? <Loading/> : <></>*/}
      {children}
    </SocketContext.Provider>
  )
}
