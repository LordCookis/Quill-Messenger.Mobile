import { StatusBar } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from "react"
import { useSocketStore } from './stores/socket-store'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useSocket from './hooks/use-socket'
import Login from './components/Login'
import ChatList from './components/ChatList'
import ChatBox from './components/ChatBox'
import Menu from './components/Menu'

export default function App() {
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
        <Stack.Screen name='ChatList' component={ChatList} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='ChatBox' component={ChatBox} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
