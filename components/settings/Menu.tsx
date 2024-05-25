import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Dimensions, Pressable, Text } from 'react-native'
import { logoutAPI } from "../../api/user-api"
import { WarningContext } from "../../lib/warning/warning-context"
import { useAccountStore } from "../../stores/account-store"
import { useChatStore } from "../../stores/chat-store"
import Icon from '../../assets/Icons'
import Animated, { withTiming, Easing } from 'react-native-reanimated'
import { stylesData } from '../../styles/stylesData'

export default function Menu({navigation, animWight}:any){
  const user:any = useAccountStore()
  const chat:any = useChatStore()
  const warning:any = useContext(WarningContext)
  const [widgh, setWight] = useState()

  useEffect(()=>{setWight(animWight)},[])

  const closeMenu = () => {animWight.value = withTiming(animWight.value - stylesData.width, {duration: 250, easing: Easing.linear})}

  const logout = () => {
    logoutAPI()
    user.clearAccountStore()
    chat.clearChatStore()
    navigation.navigate('Login')
  }

  return(
    <Animated.View style={[styles.menu, {width: widgh}]}>
      <View style={styles.panel}>
        <View style={styles.titleView}><Icon.Quill/><Text style={styles.titleText}>Quill Messenger</Text></View>
          <View style={styles.userData}>
            <View style={styles.linkUserImage}>
              {user.avatar.format ? <Image
              style={styles.userImage}
              source={{uri:`data:image/${user.avatar.format};base64,${user.avatar.code}`}}/> : <></>}
            </View>
            <View>
              <Text style={styles.displayedName}>{user.displayedName}</Text>
              <Text style={styles.usertag}>{user.usertag}</Text>
            </View>
          </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={()=>navigation.navigate('Account')}><Icon.Settings/><Text style={styles.buttonText}> Аккаунт</Text></Pressable>
          <Pressable style={styles.button} onPress={()=>navigation.navigate('Interface')}><Icon.Settings/><Text style={styles.buttonText}> Интрефейс</Text></Pressable>
          {/*<Pressable style={styles.button} onPress={()=>navigation.navigate('GroupCreat')}><Icon.Settings/><Text style={styles.buttonText}> Создать группу</Text></Pressable>*/}
          <Pressable style={styles.button} onPress={logout}><Icon.Logout/><Text style={{color: 'coral'}}> Выход</Text></Pressable>
        </View>
      </View>
      <Pressable style={styles.back} onPress={closeMenu}></Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  menu: {
    paddingRight: 2,
    position: 'absolute',
    zIndex: 1,
    height: stylesData.height,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  panel: {
    width: stylesData.width * 0.8,
    backgroundColor: stylesData.accent1,
  },
  back: {
    width: stylesData.width * 0.2,
  },
  titleView: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: stylesData.white,
    fontFamily: 'monospace',
    fontSize: 25,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  userData: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayedName: {
    fontSize: 25,
    color: stylesData.white,
  },
  usertag: {
    fontSize: 20,
    color: stylesData.gray,
  },
  button: {
    width: '90%',
    margin: 10,
    padding: 10,
    backgroundColor: stylesData.dialogHover,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: stylesData.white,
  },
  linkUserImage: {
    marginRight: 10,
    padding: 2,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: stylesData.connected,
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
})