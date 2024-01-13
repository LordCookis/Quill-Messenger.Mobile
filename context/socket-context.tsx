import * as React from 'react'
import { createContext, useEffect, useContext, useState } from "react"
import Loading from '../components/Loading'
import { fetchLatestMessageAPI } from "../api/message-api"
import { useAccountStore } from '../stores/account-store'
import { useNavigation } from '@react-navigation/native'
import { useChatStore } from '../stores/chat-store'
import { useMessageStore } from '../stores/messages-store'
import io, { Socket } from "socket.io-client"
import { WarningContext } from '../lib/warning/warning-context'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'

export const SocketContext: any = createContext(null)

export default function SocketWrapper({children}: any){
  const {userChats}:any = useChatStore()
  const warning = useContext(WarningContext)
  const {addMessage, setChatHistory, setIsTyping}:any = useMessageStore()
  const [socket, setSocket] = useState<Socket | null | any>()
  const {_id}:any = useAccountStore()
  const navigation = useNavigation()
  const [route, setRoute] = useState(navigation.getState()?.routes[navigation.getState()?.routes.length - 1].name)

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setRoute(navigation.getState()?.routes[navigation.getState()?.routes.length - 1].name)
    })
    return unsubscribe
  }, [navigation])

  useEffect(()=>{
    //New socket.io connection won't be created if on the logging page
    if(route == "Login"){return}
    const newSocket = io(`ws://192.168.1.194:4000/?_id=${_id}`, {
      reconnection: true, // включить повторное подключение
      reconnectionDelay: 2000, // интервал между попытками (в миллисекундах)
      reconnectionAttempts: 100 // максимальное количество попыток
    });

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
  }, [route])

  //Delete socket.io instance after logging out
  useEffect(()=>{
    if(route != "Login" || !socket){return}
    socket.disconnect()
    setSocket(null)
  }, [route])

  useEffect(()=>{
    if(!socket?.connected){return}
    socket.on('newMessage', (data: any) => {
      addMessage(data)
    })
    socket.on('typing', (data: any) => {
      setIsTyping({chatID: data.chatID, state: data.state})
    })
    return () => {
      socket.off('newMessage')
      socket.off('typing')
    }
  }, [socket])

  useEffect(()=>{
    fillMessagesPreview()
  }, [userChats])

  const fillMessagesPreview = async() => {
    for(let i = 0; i < userChats.length; i++){
      tryCatch(async()=>{
        const latestMessage = await netRequestHandler(fetchLatestMessageAPI(userChats[i]._id), warning)
        setChatHistory({chatID: userChats[i]._id, messages: latestMessage.data.reverse()})
      })
    }
  }

  return(
    <SocketContext.Provider value={socket}>
      {!socket?.connected && route != "Login" && route != undefined ? <Loading/> : <></>}
      {children}
    </SocketContext.Provider>
  )
}