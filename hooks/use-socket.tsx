import { useSocketStore } from "../stores/socket-store"
import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

export default function useSocket(){
  const [socket, setSocket]: any = useState<Socket | null>(null)
  const {status, setStatus}: any = useSocketStore()

  // connection and disconnection
  useEffect(()=>{
    const newSocket = io('ws://192.168.1.194:4000');
    setSocket(newSocket)
    
    newSocket.on('connect', ()=> {
      setStatus(true)
      console.log("Connected to the server")
    })

    newSocket.on('disconnect', ()=>{
      setStatus(false)
      console.log("Disconnected from the server")
    })

    return () => {
      newSocket.removeAllListeners();
      newSocket.disconnect();
    }
  }, [])

  const unsubscribe = (eventName: string) => {
    console.log("called unsub")
    socket.off(eventName, ()=>{
      console.log("unsubscribed from: ", eventName)
    })
  }

  const getConnectedUsers = () => {
    console.log('asked for users!')
    socket.emit('getConnectedUsers')
  }

  return {io: socket, getConnectedUsers, unsubscribe}
}