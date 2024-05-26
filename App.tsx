import { StatusBar } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAccountStore } from './stores/account-store'
import Login from './components/other/Login'
import DialogList from './components/dialogs/DialogList'
import DialogChat from './components/dialogs/DialogChat'
import Group from './components/groups/Group'
import Account from './components/settings/Account'
import Interface from './components/settings/Interface'
import GroupCreat from './components/groups/GroupCreat'
import SocketWrapper from './context/socket-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const user = useAccountStore()
  const Stack = createNativeStackNavigator()
  const [mainView, setMainView] = useState<string>('Login')
  const [checked, setCheked] = useState<boolean>(false)

  useEffect(()=>{
    const check = async() => {
      const account = JSON.parse(await AsyncStorage.getItem('userAccount') || '{"state":{"_id":0}}').state._id
      if(account){ setMainView('DialogList') }
      user.setConnect(1)
      setCheked(true)
    }
    check()
  }, [])

  return(
    <NavigationContainer>
      <StatusBar backgroundColor={'#18191e'} barStyle={'light-content'}/>
      <SocketWrapper _id={user._id}>
      {checked && <Stack.Navigator initialRouteName={mainView}>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='DialogList' component={DialogList} options={{ headerShown: false }}/>
        <Stack.Screen name='DialogChat' component={DialogChat} options={{ headerShown: false }}/>
        <Stack.Screen name='Group' component={Group} options={{ headerShown: false }}/>
        <Stack.Screen name='Account' component={Account} options={{ headerShown: false }}/>
        <Stack.Screen name='Interface' component={Interface} options={{ headerShown: false }}/>
        <Stack.Screen name='GroupCreat' component={GroupCreat} options={{ headerShown: false }}/>
      </Stack.Navigator>}
      </SocketWrapper>
    </NavigationContainer>
  )
}