import * as React from 'react'
import { useContext } from 'react'
import { StyleSheet, View, Image, Dimensions, Pressable, Text } from 'react-native'
import { logout } from "../api/user-api"
import { WarningContext } from "../lib/warning/warning-context"
import { useAccountStore } from "../stores/account-store"
import { useChatStore } from "../stores/chat-store"
import Icon from '../assets/Icons'

export default function Menu({navigation, setTab}:any){
  const user:any = useAccountStore()
  const chat:any = useChatStore()
  const warning:any = useContext(WarningContext)
  const leave = () => {
    logout()
    user.clearAccountStore()
    chat.clearChatStore()
    navigation.navigate('Login')
  }

  return(
    <View style={styles.menu}>
      <View style={styles.panel}>
        <View style={styles.titleView}><Icon.Quill/><Text style={styles.titleText}>Quill Messenger</Text></View>
          <View style={styles.userData}>
            <View style={styles.linkUserImage}>
              {user.avatar ? <Image
              style={styles.userImage}
              source={{uri:user.avatar}}
              alt="pfp"/> : <></>}
            </View>
            <View>
              <Text style={styles.displayedName}>{user.displayedName}</Text>
              <Text style={styles.usertag}>{user.usertag}</Text>
            </View>
          </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={()=>navigation.navigate('Account')}><Icon.Settings/><Text style={styles.buttonText}> Аккаунт</Text></Pressable>
          <Pressable style={styles.button} onPress={()=>navigation.navigate('Interface')}><Icon.Settings/><Text style={styles.buttonText}> Интрефейс</Text></Pressable>
          <Pressable style={styles.button} onPress={leave}><Icon.Logout/><Text style={[{color: 'coral',}]}> Выход</Text></Pressable>
        </View>
      </View>
      <Pressable style={styles.back} onPress={()=>setTab(false)}></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  panel: {
    width: '80%',
    backgroundColor: '#17191f',
    borderRightWidth: 2,
    borderColor: '#8d70ff',
  },
  back: {
    width: '20%',
    backgroundColor: '#8d70ff00',
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
  displayedName: {
    fontSize: 25,
    color: '#ffffff',
  },
  usertag: {
    fontSize: 20,
    color: '#cccccc',
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
    marginRight: 10,
    padding: 2,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#8d70ff',
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
})