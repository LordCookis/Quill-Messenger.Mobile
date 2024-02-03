import * as React from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, ScrollView } from 'react-native'
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

export default function DialogList({navigation}:any){
  const chatStore = useChatStore()
  const {userGroups, setUserGroups}:any = useGroupStore()
  const messagesStore = useMessageStore()
  const [search, setSearch] = useState<string>("")
  const [rawInput, setRawInput] = useState('')
  const socket: Socket | any = useContext(SocketContext)
  const warning = useContext<any>(WarningContext)
  const user = useAccountStore()
  const [tab, setTab] = useState<boolean>(false)
  const [find, setFind] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)

  useEffect(()=>{
    if(!socket?.connected){return}
    focus ?
    tryCatch(async()=>{
      console.log(1)
      const result = await netRequestHandler(()=>fetchUserChatsAPI(user._id), warning)
      let newObj: any = {}
      result.data?.chats?.map(async (chat: chat) => {
        newObj[chat._id] = {...chat, isTyping: false, lastMessage: messagesStore.messagesHistory[chat._id]?.messages[messagesStore.messagesHistory[chat._id]?.messages.length-1]?.createdAt, inputMessage: ""}
      })
      chatStore.setUserChats(newObj)
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
          value={search}
          onChangeText={(e)=>setRawInput(e)}
          placeholder="Search by tag"
          placeholderTextColor={'#2c2f38'}
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
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection:  'column',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#18191e',
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
    borderBottomColor: '#c577e4',
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