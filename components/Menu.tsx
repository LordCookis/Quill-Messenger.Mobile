import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Dimensions, Pressable, Text, TextInput } from 'react-native'
import { logout } from "../api/user-api"
import { useSocketStore } from "../stores/socket-store"
import { WarningContext } from "../lib/warning/warning-context"
import { useAccountStore } from "../stores/account-store"
import { useChatStore } from "../stores/chat-store"
import { updateProfile } from "../api/user-api"
import { setItem } from "../lib/async-storage"
import Icon from '../assets/Icons'

export default function Menu({navigation}:any){
  const {status}:any = useSocketStore()
  const user:any = useAccountStore()
  const chat:any = useChatStore()
  const warning:any = useContext(WarningContext)
  const {setUser} = useAccountStore()
  const [newData, setNewData] = useState({
    avatar: user.avatar,
    displayedName: user.displayedName
  })

  const update = async() => {
    const result = await updateProfile({_id: user._id, ...newData})
    if(result.status >= 400){
      warning.showWindow({title: "Couldn't update", message: `Something went wrong!: ${result.message}`});
      return
    }
    setItem('userdata', result.data)
    setUser(result.data)
  }
  const leave = () => {
    logout()
    user.clearAccountStore()
    chat.clearChatStore()
    navigation.navigate('Login')
  }

  return(
    <View style={styles.sidebar}>
      <View style={styles.titleView}><Icon.Quill/><Text style={styles.titleText}>Quill Messenger</Text></View>
      <View style={styles.userData}>
          <Pressable>
            {user.avatar ? <Image
              style={styles.userImage}
              source={{uri:user.avatar}}
              alt="pfp"/> : <></>}
          </Pressable>
          <View>
            <TextInput
              style={styles.dataInput}
              value={newData.displayedName}
              placeholder={user.usertag}
              onChangeText={(e)=>setNewData({...newData, displayedName: e})}
            />
            <TextInput
              style={styles.dataInput}
              value={newData.avatar}
              onChangeText={(e)=>setNewData({...newData, avatar: e})}
            />
          </View>
        </View>
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Save changes</Text></Pressable>
      <View style={styles.buttons}>
        <Pressable style={styles.button}><Icon.Messages/><Text style={styles.buttonText}> Сообщения</Text></Pressable>
        <Pressable style={styles.button}><Icon.People/><Text style={styles.buttonText}> Группы</Text></Pressable>
        <Pressable style={styles.button}><Icon.Discover/><Text style={styles.buttonText}> Найти</Text></Pressable>
        <Pressable style={styles.button}><Icon.Settings/><Text style={styles.buttonText}> Настройки</Text></Pressable>
        <Pressable style={styles.button} onPress={leave}><Icon.Logout/><Text style={[{color: 'coral',}]}> Выход</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#17191f',
  },
  titleView: {
    marginVertical: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 25,
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  userData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataInput: {
    width: 200,
    margin: 5,
    marginLeft: 15,
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
  },
  saveButton: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#57546150",
  },
  saveText: {
    fontSize: 15,
    color: '#ffffff',
  },
  button: {
    width: '90%',
    margin: 10,
    padding: 10,
    backgroundColor: '#1e2027',
    border: 'none',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
  },
  linkUserImage: {
    padding: 0,
  },
  userImage: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#8d70ff',
  },
})