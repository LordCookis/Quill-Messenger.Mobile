import { useChatStore } from '../stores/chat-store'
import { useAccountStore } from '../stores/account-store'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions } from 'react-native'
import { createChat, getChats } from '../api/chat-api'
import { inputFilter } from '../utils/input-filter'
import { fetchUserTag } from '../api/user-api'
import { WarningContext } from '../lib/warning/warning-context'
import { SocketContext } from '../context/socket-context'
import { Socket } from 'socket.io-client'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'
import Message from './Messege'
import Icon from "../assets/Icons"
import Menu from './Menu'

export default function ChatList({navigation}:any){
  const {userChats, setUserChats, addNewChat}:any = useChatStore()
  const [search, setSearch] = useState<string>("")
  const warning:any = useContext(WarningContext)
  const socket: Socket | any = useContext(SocketContext)
  const user:any = useAccountStore()
  const [tab, setTab] = useState<boolean>(false)
  const [find, setFind] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)

  const fetchChats = async() => {
    tryCatch(async()=>{
      const result = await netRequestHandler(getChats(user._id), warning)
      console.log("Fetched chats", result)
      setUserChats(result.data.chats)
    })
  }

  const fetchGroups = async() => {
    setUserChats([])
  }

  const addNewUserChat = async() => {
    if(search == user._id) { return }
    const secondUser = await fetchUserTag(search)
    if(secondUser.status >= 400){
      //warning.showWindow({title: `User doesn't exist`, message: `The user "${search}" you've been searching for doesn't exist :<`})
      alert("Ощипка")
      return
    }
    const doesChatExist = userChats.filter((chat: any) => {
      if(chat.members[0] == secondUser.data._id || chat.members[1] == secondUser.data._id){
        console.log("FOUND THE SAME CHAT, REDIRECTING")
        return true
      }
    })
    if(doesChatExist.length){return}
    const newChat = await createChat(user._id, secondUser.data._id)
    addNewChat(newChat.data)
  }

  useEffect(()=>{
    !userChats.length && user._id && socket?.connected && !focus ? fetchChats() : fetchGroups()
  }, [user._id, socket?.connected, focus])

  return(
    <>
    {tab && <Menu navigation={navigation} setTab={setTab}/>}
    <View style={styles.chatlist}>
      <View style={styles.searchBlock}>
        <Pressable onPress={()=>setTab(true)}>
          <Icon.AddUser/>
        </Pressable>
        {find ? 
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => setSearch(inputFilter(e))}
          placeholder="Search by tag"
          placeholderTextColor={'#2c2f38'}
          inputMode="text"
        /> : 
        <Pressable onPress={()=>setFind(true)}><Text style={styles.chatHeader}>Messages</Text></Pressable>}
        <Pressable onPress={addNewUserChat}>
          <Icon.AddUser/>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Text style={styles.legend}><Icon.Letter/> ALL MESSAGES</Text>
        <View style={styles.type}>
          <Pressable style={!focus ? styles.typeFocus : styles.typeNoFocus} onPress={()=>setFocus(!focus)}><Text style={styles.typeText}>СООБЩЕНИЯ</Text></Pressable>
          <Pressable style={focus ? styles.typeFocus : styles.typeNoFocus} onPress={()=>setFocus(!focus)}><Text style={styles.typeText}>ГРУППЫ</Text></Pressable>
        </View>
        {userChats?.map((chat:any) => (
          <>
          <Message key={chat._id} chat={chat} navigation={navigation}/>
          </>
        ))}
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  chatlist: {
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection:  'column',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#17191f',
  },
  chatHeader: {
    fontFamily: 'monospace',
    fontSize: 30,
    color: '#ffffff',
  },
  searchBlock: {
    height: '10%',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    margin: 5,
    padding: 10,
    fontSize: 13,
    width: '70%',
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
  },
  block: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  legend: {
    margin: 5,
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  type: {
    width: Dimensions.get('window').width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  typeFocus: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: '#8d70ff',
    alignItems: 'center',
  },
  typeNoFocus: {
    flex: 1,
    paddingBottom: 1.5,
    alignItems: 'center',
  },
  typeText: {
    margin: 10,
    fontSize: 15,
    color: '#ffffff',
    fontFamily: 'monospace',
  },
})