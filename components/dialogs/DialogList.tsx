import * as React from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import Icon from "../../assets/Icons"
import Menu from '../settings/Menu'
import Dialog from './Dialog'
import Group from '../groups/Group'
import { chat, useChatStore } from '../../stores/chat-store'
import { useGroupStore } from '../../stores/group-store'
import { useAccountStore } from '../../stores/account-store'
import { useMessageStore } from '../../stores/messages-store'
import { createNewChatAPI, fetchUserChatsAPI } from '../../api/chat-api'
import { fetchUserGroupsAPI } from '../../api/group-api'
import { inputFilter } from '../../utils/input-filter'
import { fetchUserByTagAPI } from '../../api/user-api'
import { WarningContext } from '../../lib/warning/warning-context'
import { SocketContext } from '../../context/socket-context'
import { Socket } from 'socket.io-client'
import { tryCatch } from '../../utils/try-catch'
import { netRequestHandler } from '../../utils/net-request-handler'
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated'
import { stylesData } from '../../styles/stylesData'

export default function DialogList({navigation}:any){
  const chatStore = useChatStore()
  const {userGroups, setUserGroups}:any = useGroupStore()
  const messagesStore = useMessageStore()
  const [search, setSearch] = useState<string>("")
  const [rawInput, setRawInput] = useState('')
  const socket: Socket | any = useContext(SocketContext)
  const warning = useContext<any>(WarningContext)
  const user = useAccountStore()
  const [find, setFind] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)
  const animWight = useSharedValue(0)

  useEffect(()=>{
    if(!socket?.connected){return}
    !focus ?
    tryCatch(async()=>{
      const result = await netRequestHandler(()=>fetchUserChatsAPI(user._id), warning)
      let newObj: any = {}
      console.log(result.data)
      result.data?.chats?.map(async (chat: chat) => {
        newObj[chat._id] = {...chat, isTyping: false, lastMessage: messagesStore.messagesHistory[chat._id]?.messages[messagesStore.messagesHistory[chat._id]?.messages.length-1]?.createdAt, inputMessage: ""}
      })
      chatStore.setUserChats(newObj)
      console.log(newObj)
    }) :
    tryCatch(async()=>{
      const result = await netRequestHandler(()=>fetchUserGroupsAPI(user._id), warning)
      setUserGroups(result.data.groups)
    })
  }, [socket?.connected])

  useEffect(() => {
    setSearch(inputFilter(rawInput))
  }, [rawInput])

  const createNewChat = async() => {
    if(search == user.usertag){return}
    tryCatch(async()=>{
      const secondUser = await netRequestHandler(()=>fetchUserByTagAPI(search), warning)
      const doesChatExist = Object.keys(chatStore.userChats).filter((chat: any) => {
        if(chatStore.userChats[chat].members[0] == secondUser.data._id || chatStore.userChats[chat].members[0] == secondUser.data._id){ return true }
      })
      if(doesChatExist.length){return}
      const newChat = await netRequestHandler(()=>createNewChatAPI(user._id, secondUser.data._id), warning)
      chatStore.addNewChat(newChat.data)
    })
  }

  const openMenu = () => {animWight.value = withTiming(animWight.value + stylesData.width, {duration: 250, easing: Easing.linear})}

  return(
    <>
    <Menu navigation={navigation} animWight={animWight}/>
    <View style={styles.chatlist}>
      <View style={styles.searchBlock}>
        <Pressable onPress={openMenu}>
          <Icon.AddUser/>
        </Pressable>
        {find ? 
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={(e)=>setRawInput(e)}
          placeholder="Search by tag"
          placeholderTextColor={stylesData.gray}
        /> : 
        <Pressable onPress={()=>setFind(true)}><Text style={styles.chatHeader}>Messages</Text></Pressable>}
        <Pressable onPress={createNewChat}>
          <Icon.AddUser/>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Text style={styles.legend}><Icon.Letter/> ALL MESSAGES</Text>
        <View style={styles.type}>
          <Pressable style={!focus ? styles.typeFocus : styles.typeNoFocus} onPress={()=>setFocus(false)}><Text style={styles.typeText}>СООБЩЕНИЯ</Text></Pressable>
          <Pressable style={focus ? styles.typeFocus : styles.typeNoFocus} onPress={()=>setFocus(true)}><Text style={styles.typeText}>ГРУППЫ</Text></Pressable>
        </View>
        <ScrollView>
        {!focus ?
          Object.keys(chatStore.userChats)?.map((keyname: string) => (
            <Dialog key={chatStore.userChats[keyname]._id} chat={chatStore.userChats[keyname]} messagesStore={messagesStore.messagesHistory[chatStore.userChats[keyname]._id]} navigation={navigation}/>
          )) :
          userGroups?.map((group:any) => (
            <Group key={group._id} group={group} messagesStore={messagesStore.messagesHistory[group._id]} navigation={navigation}/>
          ))}
        </ScrollView>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  chatlist: {
    height: stylesData.height,
    width: stylesData.width,
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection:  'column',
    alignItems: 'center',
    backgroundColor: stylesData.accent2,
  },
  chatHeader: {
    fontFamily: 'monospace',
    fontSize: 30,
    color: stylesData.white,
  },
  searchBlock: {
    height: stylesData.height * 0.1,
    width: stylesData.width,
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
    width: stylesData.width * 0.7,
    borderRadius: 10,
    color: stylesData.white,
    backgroundColor: stylesData.accent1,
  },
  block: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  legend: {
    margin: 5,
    color: stylesData.white,
    fontFamily: 'monospace',
  },
  type: {
    width: stylesData.width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  typeFocus: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: stylesData.appmessage,
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
    color: stylesData.white,
    fontFamily: 'monospace',
  },
})