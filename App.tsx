import { StatusBar, StyleSheet } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from "react"
import { useAccountStore } from "./stores/account-store"
import { useSocketStore } from './stores/socket-store'
import useSocket from './hooks/use-socket'
import Login from './components/Login'
import ChatList from './components/ChatList'
import Navbar from './components/Navbar'

export default function App() {
  const [register, setRegister] = useState<boolean>(false)
  const {usertag, setUser}:any = useAccountStore()
  const {socket, setSocket}:any = useSocketStore()
  const socketHook = useSocket()

  useEffect(()=>{
    !socket && socketHook.io && setSocket(socketHook)
  }, [socketHook])

  return (
    <>
      <StatusBar backgroundColor={'#17191f'} barStyle={'light-content'}/>
      {!register ? 
      <Login setRegister = {setRegister}/> :
      /*<View style={styles.container}><Pressable onPress={()=>setRegister(false)}>
        <Text>Че доволен Ликер?</Text></Pressable>
      </View>*/
      <>
        <ChatList setRegister = {setRegister}/>
        <Navbar/>
      </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
