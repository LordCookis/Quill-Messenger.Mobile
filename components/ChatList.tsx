//import Input from '../interface/Input'
import { useChatStore } from '../stores/chat-store'
import { useAccountStore } from '../stores/account-store'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, Image } from 'react-native'
import { createChat, getChats } from '../api/chat-api'
import { inputFilter } from '../utils/input-filters'
import { fetchUserTag } from '../api/user-api'
import { WarningContext } from '../lib/warning/warning-context'
//import { NativeRouter } from "react-router-native"

export default function ChatList({register, setRegister}:any){
  const {userChats, setUserChats, addNewChat}: any = useChatStore()
  const warning: any = useContext(WarningContext)
  const [search, setSearch] = useState<string>("")
  const user: any = useAccountStore()

  const fetchChats = async() => {
    //const result = await getChats(user._id)
    //setUserChats(result.data.chats)
  }

  const addNewUserChat = async() => {
    //if(search == user._id){return}
    //const secondUser = await fetchUserTag(search)
    //if(secondUser.status >= 400){
    //  warning.showWindow({title: `User doesn't exist`, message: `The user "${search}" you've been searching for doesn't exist :<`})
    //  return
    //}
    //
    //const doesChatExist = userChats.filter((chat: any) => {
    //  if(chat.members[0] == secondUser.data._id || chat.members[1] == secondUser.data._id){
    //    //router.push(`/chat/${chat._id}`)
    //    console.log("FOUND THE SAME CHAT, REDIRECTING")
    //    return true
    //  }
    //})
    //if(doesChatExist.length){return}
//
    //const newChat = await createChat(user._id, secondUser.data._id)
    //addNewChat(newChat.data)
  }

  useEffect(()=>{
    //!userChats.length && user._id && fetchChats()
  }, [user._id, userChats])

  const killMe = () => { setRegister(false) }

  return(
    <View style={styles.chatlist}>
      <Text style={styles.chatHeader}>Messages</Text>
      <View style={styles.searchBlock}>
        {<TextInput
          style={styles.searchInput}
          onChange={(e:any)=>setSearch(inputFilter(e.target.value))}
          //value={search}
          //fancy={{text: "Search by tag", placeholder: "User Tag", background: "#1e2027", backgroundHover: "#2c2f38"}}
          placeholder='Search by tag'
          placeholderTextColor={'#2c2f38'}
          inputMode='text'/>}
        <Pressable onPress={addNewUserChat} style={styles.createChat}></Pressable>
      </View>
      {/*<fieldset style={styles.block}>
        <legend>ALL MESSAGES</legend>
        {userChats?.map((chat: any) => (
          <Link
            key={chat._id}
            href={`/chat/${chat._id}`}>
            <Message
              chat={chat}
              user={user}/>
          </Link>
        ))}
      </fieldset>*/}
      <View style={styles.block}>
        <Text style={styles.legend}>ALL MESSAGES</Text>
        {userChats?.map((chat:any) => {
          return(<></>)
        })}
        <View style={styles.messageBlock}>
          <Image style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri: 'https://static.zerochan.net/Kirisame.Marisa.full.2283889.jpg'}}/>
          <View style={styles.messageContent}>
            <View style={styles.top}>
              <Text style={styles.name}>LordCookis</Text>
              <Text style={styles.time}>12:00 AM</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.message}>ШРИФТЫ РАБОТАЮТ</Text>
              <Text style={styles.status}>!!</Text>
            </View>
          </View>
        </View>
        <View style={styles.messageBlock}>
          <Image style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri: 'https://sun1-57.userapi.com/s/v1/ig2/vH3xEgMHzcMf0WQy1jew9BN3a_J_D1rsQAlGO16MN4Arfteswjl6jwP6AJUOzushKLLYG4uo73XQPu-Wp014p8w3.jpg?size=400x400&quality=95&crop=11,0,1428,1428&ava=1'}}/>
          <View style={styles.messageContent}>
            <View style={styles.top}>
              <Text style={styles.name}>Konch</Text>
              <Text style={styles.time}>11:23 AM</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.message}>Карету выбираешь?</Text>
              <Text style={styles.status}>!!</Text>
            </View>
          </View>
        </View>
        <View style={styles.messageBlock}>
          <Image style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri: 'http://pm1.narvii.com/7751/72aab3381a7ee198106b56fb963974155687ea5er1-736-735v2_hq.jpg'}}/>
          <View style={styles.messageContent}>
            <View style={styles.top}>
              <Text style={styles.name}>Aqua Real 1337</Text>
              <Text style={styles.time}>07:51 PM</Text>
            </View>
            <View style={styles.bottom}>
              <Text style={styles.message}>Что такое фотопленка?!</Text>
              <Text style={styles.status}>!!</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable onPress={killMe}><Text>Че доволен Ликер?</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  chatlist: {
    display: 'flex',
    flexDirection:  'column',
    alignItems: 'center',
    overflow: 'hidden',
    height: Dimensions.get('window').height,
    backgroundColor: '#17191f',
  },
  chatHeader: {
    paddingTop: 10,
    paddingRight: 15,
    fontFamily: 'Calibri',
    fontSize: 30,
    color: '#ffffff',
  },
  searchBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    fontSize: 13,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
  },
  createChat: {},
  block: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  legend: {
    margin: 5,
    color: '#ffffff',
    fontFamily: 'Calibri',
  },
  messageBlock: {
    width: Dimensions.get('window').width / 1.125,
    paddingVertical: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e3b54',
    borderRadius: 10,
  },
  messageContent: {
    marginLeft: 10,
    width: '80%',
    display: 'flex',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#ffffff'
  },
  time: {
    color: '#808080'
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    color: '#808080'
  },
  status: {},
})

/*const styles = StyleSheet.create({
  chatlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#var(--var-accent4)',
    padding: 10,
    width: 270,
    maxWidth: 270,
    overflow: 'hidden',
    height: Dimensions.get('window').height,
  },
  chatHeader: {
    paddingTop: 0,
    paddingRight: 15,
    fontFamily: 'Calibri',
  },
  block: {
    flexDirection: 'column',
    marginTop: 20,
    border: 'none',
    padding: 0,
    height: '100%',
    overflowY: 'auto',
  },
  legend: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Calibri',
  },
  searchBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    padding: 10,
    fontSize: 13,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
  },
  createChat: {
    flexDirection: 'row',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#50505020',
    borderWidth: 0,
    borderColor: 'transparent',
    cursor: 'pointer',
  },
})*/