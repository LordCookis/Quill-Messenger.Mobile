import * as React from 'react'
import { createContext, useEffect, useRef, useState } from "react"
import io, { Socket } from "socket.io-client"
import Loading from '../components/Loading'
import { useAccountStore } from '../stores/account-store'
import { useNavigation } from '@react-navigation/native'

export const SocketContext: any = createContext(null)

export default function SocketWrapper({children}: any){
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
    if(route == "Login" || route === undefined){return}
    const newSocket = io(`ws://192.168.1.194:4000/?_id=${_id}`, {
      reconnection: true, // включить повторное подключение
      reconnectionDelay: 2000, // интервал между попытками (в миллисекундах)
      reconnectionAttempts: 100 // максимальное количество попыток
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
    console.log(socket)
    return () => {
      newSocket.disconnect()
      newSocket.removeAllListeners()
    }
  }, [route])

  //Delete socket.io instance after logging out
  useEffect(()=>{
    if(route != "Login" || !socket || route === undefined){return}
    socket.disconnect()
    setSocket(null)
  }, [route])

  return(
    <SocketContext.Provider value={socket}>
      {!socket?.connected && route != "Login" && route != undefined ? <Loading/> : <></>}
      {children}
    </SocketContext.Provider>
  )
}