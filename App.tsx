import { StatusBar } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAccountStore } from './stores/account-store'
import Login from './components/other/Login'
import DialogList from './components/dialogs/DialogList'
import Chat from './components/dialogs/Chat'
import Group from './components/groups/Group'
import Account from './components/settings/Account'
import Interface from './components/settings/Interface'
import GroupCreat from './components/groups/GroupCreat'
import SocketWrapper from './context/socket-context'

export default function App() {
  const user = useAccountStore()
  const Stack = createNativeStackNavigator()

  return(
    <NavigationContainer>
      <StatusBar backgroundColor={'#17191f'} barStyle={'light-content'}/>
      <SocketWrapper _id={user._id}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='DialogList' component={DialogList} options={{ headerShown: false }}/>
          <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/>
          <Stack.Screen name='Group' component={Group} options={{ headerShown: false }}/>
          <Stack.Screen name='Account' component={Account} options={{ headerShown: false }}/>
          <Stack.Screen name='Interface' component={Interface} options={{ headerShown: false }}/>
          <Stack.Screen name='GroupCreat' component={GroupCreat} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </SocketWrapper>
    </NavigationContainer>
  )
}