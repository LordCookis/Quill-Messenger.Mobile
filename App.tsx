import { StatusBar, StyleSheet } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from "react"
import { useAccountStore } from "./stores/account-store"
import { useSocketStore } from './stores/socket-store'
import useSocket from './hooks/use-socket'
import Login from './components/Login'
import ChatList from './components/ChatList'
import ChatBox from './components/ChatBox'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function App() {
  const [register, setRegister] = useState<boolean>(false)
  const {usertag, setUser}:any = useAccountStore()
  const {socket, setSocket}:any = useSocketStore()
  const socketHook = useSocket()
  const Stack = createNativeStackNavigator()

  useEffect(()=>{
    !socket && socketHook.io && setSocket(socketHook)
  }, [socketHook])

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#17191f'} barStyle={'light-content'}/>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        {/*<Stack.Screen name='ChatList' component={ChatList} options={{ headerShown: false }}></Stack.Screen>*/}
        <Stack.Screen name='ChatBox' component={ChatBox} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
