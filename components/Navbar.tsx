import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { NativeRouter, Link } from "react-router-native"
import { logout } from "../api/user-api"
import { useSocketStore } from "../stores/socket-store"
import { WarningContext } from "../lib/warning/warning-context"
import { useAccountStore } from "../stores/account-store"
import { useChatStore } from "../stores/chat-store"
import Icon from '../assets/Icons'

export default function Navbar(){
  const [activePage, setActivePage] = useState("/")
  const {status}: any = useSocketStore()
  const user: any = useAccountStore()
  const chat: any = useChatStore()
  const warning: any = useContext(WarningContext)

  const leave = () => {
    logout()
    user.clearAccountStore()
    chat.clearChatStore()
    //router.replace('/')
  }

  //useEffect(()=>{
  //  const pathname = router.pathname.split('/')
  //  if(pathname.includes('chat')){
  //    setActivePage('/chat')
  //    return
  //  }
  //  setActivePage(router.pathname)
  //}, [router.pathname])


  return(
    <NativeRouter>
    <View style={styles.sidebar}>
      <View style={styles.buttons}>
        <Icon.Quill/>
        <Link to={`${chat.activeChat?.chat?._id ? `/chat/${chat.activeChat.chat._id}` : `/chat`}`}>{activePage == "/chat" ? <Icon.MessagesActive/> : <Icon.Messages />}</Link>
        <Link to="/add-friends">{activePage == "/add-friends" ? <Icon.PeopleActive/> : <Icon.People />}</Link>
        <Link to="/discover">{activePage == "/discover" ? <Icon.DiscoverActive/> : <Icon.Discover />}</Link>
        <Link to="/settings">{activePage == "/settings" ? <Icon.SettingsActive/> : <Icon.Settings />}</Link>
        <Link to="/" onPress={leave}><Icon.Logout/></Link>
        <View style={styles.hr}/>
        <Link to="/profile">
          {user.avatar ? <Image
            style={status ? styles.connected : styles.disconnected}
            source={{uri:user.avatar}}
            alt="pfp"/> : <></>}
        </Link>
      </View>
    </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width,
    backgroundColor: '#17191f',
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderTopColor: '#9385ca',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  /*userImage: {
    padding: 2,
    borderRadius: 35,
  },*/
  linkUserImage: {
    padding: 0,
  },
  hr: {
    borderTopWidth: 1,
    //borderTopColor: '#9385ca',
    borderTopColor: 'red',
    borderBottomWidth: 0,
  },
  connected: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#8d70ff',
  },
  disconnected: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#ff6161',
  },
})