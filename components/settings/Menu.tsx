import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Modal, Pressable, Text } from 'react-native'
import { logoutAPI } from "../../api/user-api"
import { WarningContext } from "../../lib/warning/warning-context"
import { useAccountStore } from "../../stores/account-store"
import { useChatStore } from "../../stores/chat-store"
import Icon from '../../assets/Icons'
import Animated, { withTiming, Easing } from 'react-native-reanimated'
import { stylesData } from '../../styles/stylesData'
import { createNewChatAPI } from '../../api/chat-api'
import { fetchRandomUserAPI } from '../../api/user-api'
import FastImage from 'react-native-fast-image'

export default function Menu({navigation, closeMenu}:any){
  const user:any = useAccountStore()
  const chat:any = useChatStore()
  const warning:any = useContext(WarningContext)
  const [widgh, setWight] = useState()
  const [randomUser, setRandomUser] = useState<any>()
  const chatStore = useChatStore()
  const [openTab, setOpenTab] = useState<boolean>(false)

  const logout = () => {
    logoutAPI()
    user.clearAccountStore()
    chat.clearChatStore()
    navigation.navigate('Login')
  }

  useEffect(()=>{
    !randomUser && fetchRandomUser()
  }, [randomUser])
  
  const fetchRandomUser = async() => {
    const result = await fetchRandomUserAPI(user._id, user.host)
    setRandomUser({
      ...result.data,
      avatar: {
        format: 'png',
        code: result?.data?.avatar?.code,
      }
    })
  }

  const createNewChat = async() => {
    if(!randomUser){return}
    const doesChatExist = Object.keys(chatStore.userChats).filter((chat: any) => {
      if(chatStore.userChats[chat].members[0] == randomUser._id || chatStore.userChats[chat].members[0] == randomUser._id){
        console.log("CHAT EXITS")
        chatStore.setActiveChat({chat: chat, friend: randomUser})
        navigation.navigate('DialogChat', {chatID: chatStore.userChats[chat]._id})
        return true
      }
    })
    if(doesChatExist.length){return}
    const newChat = await createNewChatAPI(user._id, randomUser._id, user.host)
    chatStore.addNewChat(newChat.data)
    chatStore.setActiveChat({chat: newChat.data, friend: randomUser})
    navigation.navigate('DialogChat', {chatID: newChat.data._id})
  }

  return(
    <Animated.View style={[styles.menu, {width: widgh}]}>
      <View style={styles.panel}>
        <View style={styles.titleView}><Icon.Quill/><Text style={styles.titleText}>Quill Messenger</Text></View>
          <View style={styles.userData}>
            <View style={styles.linkUserImage}>
              {user.avatar.code ? <Image
              style={styles.userImage}
              source={{uri:user.avatar.code}}/> : <View style={[styles.userImage]}/>}
            </View>
            <View>
              <Text style={styles.displayedName}>{user.displayedName}</Text>
              <Text style={styles.usertag}>{user.usertag}</Text>
            </View>
          </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={()=>navigation.navigate('Account')}><Icon.Settings/><Text style={styles.buttonText}> Настройки</Text></Pressable>
          <Pressable style={styles.button} onPress={()=>navigation.navigate('GroupCreat')}><Icon.AddGroup/><Text style={styles.buttonText}> Создать группу</Text></Pressable>
          <Pressable style={styles.button} onPress={()=>setOpenTab(true)}><Icon.Discover/><Text style={styles.buttonText}> Испытать удачу</Text></Pressable>
          <Pressable style={styles.button} onPress={logout}><Icon.Logout/><Text style={{color: 'coral', fontFamily: 'monospace',}}> Выход</Text></Pressable>
        </View>
      </View>
      <Pressable style={styles.back} onPress={closeMenu}></Pressable>
      {openTab &&
        <Modal
        animationType="fade"
        transparent={true}
        visible={true}>
        <Pressable style={{...styles.modal, backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={()=>setOpenTab(false)}>
          <View style={{...styles.conteiner, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.topInfo}>
              <FastImage source={{uri:randomUser.avatar.code}} style={styles.topImage} resizeMode={FastImage.resizeMode.contain}/>
              <Text style={{...styles.topText, fontSize: 18}}>{randomUser.displayedName}</Text>
              <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}><Icon.User/><Text style={{...styles.topText, marginLeft: 5}}>{randomUser.usertag}</Text></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}><Icon.Calendar/><Text style={{...styles.topText, marginLeft: 5}}>3-Декабря-2023 13:53:50</Text></View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                <Text style={{...styles.topText, width: '45%', textAlign: 'center', marginTop: 5, fontSize: 15, backgroundColor: stylesData.rightMessage, borderRadius: 10, padding: 5, color: '#fff'}} onPress={()=>{fetchRandomUser()}}>Попробовать снова</Text>
                <Text style={{...styles.topText, width: '45%', textAlign: 'center', marginTop: 5, fontSize: 15, backgroundColor: stylesData.rightMessage, borderRadius: 10, padding: 5, color: '#fff'}} onPress={()=>{createNewChat(),setRandomUser(null),setOpenTab(true)}}>Начать новую беседу!</Text>
              </View>
            </View>
          </View>
        </Pressable>
        </Modal>}
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
    fontFamily: 'monospace',
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
    fontFamily: 'monospace',
  },
  usertag: {
    fontSize: 20,
    color: stylesData.gray,
    fontFamily: 'monospace',
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
    fontFamily: 'monospace',
  },
  buttonText: {
    color: stylesData.white,
    fontFamily: 'monospace',
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  conteiner: {
    height: '100%',
    paddingVertical: 10,
  },
  modalView: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 9999,
  },
  image: {
    height: stylesData.height,
    width: stylesData.width,
    resizeMode: 'contain',
  },
  deleteCont: {
    width: stylesData.width*0.7,
    backgroundColor: stylesData.accent1,
    padding: 15,
    borderRadius: 10,
  },
  topInfo: {
    padding: 20,
    height: stylesData.height*0.35,
    width: stylesData.width*0.8,
    backgroundColor: stylesData.accent1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topImage: {
    height: stylesData.height*0.135,
    width: stylesData.height*0.135,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  topText: {
    fontFamily: 'monospace',
    color: '#ccc'
  },
})