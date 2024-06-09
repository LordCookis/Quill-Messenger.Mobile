import * as React from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import Icon from "../../assets/Icons"
import Menu from '../settings/Menu'
import Dialog from './Dialog'
import Group from '../groups/Group'
import { chat, useChatStore } from '../../stores/chat-store'
import { useAccountStore } from '../../stores/account-store'
import { useMessageStore } from '../../stores/messages-store'
import { createNewChatAPI, fetchUserChatsAPI } from '../../api/chat-api'
import { inputFilter } from '../../utils/input-filter'
import { fetchUserByTagAPI } from '../../api/user-api'
import { WarningContext } from '../../lib/warning/warning-context'
import { SocketContext } from '../../context/socket-context'
import { Socket } from 'socket.io-client'
import { tryCatch } from '../../utils/try-catch'
import { netRequestHandler } from '../../utils/net-request-handler'
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated'
import { stylesData } from '../../styles/stylesData'

export default function DialogList({ navigation }: any) {
  const chatStore = useChatStore()
  const messagesStore = useMessageStore()
  const [search, setSearch] = useState<string>("")
  const [rawInput, setRawInput] = useState('')
  const socket: Socket | any = useContext(SocketContext)
  const warning = useContext<any>(WarningContext)
  const user = useAccountStore()
  const [find, setFind] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)
  const animTranslateX = useSharedValue(-stylesData.width)

  useEffect(() => {
    user.setConnect(2)
    if (!socket?.connected) { return }
    tryCatch(async()=>{
      const result = await netRequestHandler(()=>fetchUserChatsAPI(user._id, ''), warning)
      let newObj: any = {}
      result.data?.map(async (chat: chat) => {
        newObj[chat._id] = {...chat, isTyping: false, lastMessage: messagesStore.messagesHistory[chat._id]?.messages[messagesStore.messagesHistory[chat._id]?.messages.length-1]?.createdAt, inputMessage: ""}
      })
      chatStore.setUserChats(newObj)
    })
  }, [socket?.connected])

  useEffect(() => { setSearch(inputFilter(rawInput)) }, [rawInput])

  const createNewChat = async () => {
    if (search == user.usertag) { return }
    tryCatch(async () => {
      const secondUser = await netRequestHandler(() => fetchUserByTagAPI(search), warning);
      const doesChatExist = Object.keys(chatStore.userChats).filter((chat: any) => {
        if (chatStore.userChats[chat].members[0] == secondUser.data._id || chatStore.userChats[chat].members[1] == secondUser.data._id) { return true }
      })
      if (doesChatExist.length) { return }
      const newChat = await netRequestHandler(() => createNewChatAPI(user._id, secondUser.data._id, user.host), warning)
      chatStore.addNewChat(newChat.data)
      setSearch('')
      setFind(false)
    })
  }

  const openMenu = () => { animTranslateX.value = withTiming(0, { duration: 150, easing: Easing.linear }) }

  const closeMenu = () => { animTranslateX.value = withTiming(-stylesData.width, { duration: 150, easing: Easing.linear }) }

  const animatedStyle = useAnimatedStyle(() => { return { transform: [{ translateX: animTranslateX.value }] } })

  return(
    <>
    <Animated.View style={[styles.menu, animatedStyle]}>
      <Menu navigation={navigation} closeMenu={closeMenu}/>
    </Animated.View>
    <View style={styles.chatlist}>
      <View style={styles.searchBlock}>
        <Pressable onPress={openMenu}>
          <Icon.Menu/>
        </Pressable>
        {find ?
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={(e) => setRawInput(e)}
            placeholder="Search by tag"
            placeholderTextColor={stylesData.gray}
          /> :
          <Pressable onPress={() => setFind(true)}><Text style={styles.chatHeader}>Messages</Text></Pressable>}
        <Pressable onPress={search.length < 3 ? ()=>{setSearch('');setFind(false)} : createNewChat}>
          <Icon.AddUser style={{transform:[{rotate: search.length < 3 ? '45deg' : '0deg'}]}}/>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Text style={styles.legend}><Icon.Letter /> ALL MESSAGES</Text>
        <View style={styles.type}>
          <Pressable style={!focus ? styles.typeFocus : styles.typeNoFocus} onPress={() => setFocus(false)}><Text style={styles.typeText}>СООБЩЕНИЯ</Text></Pressable>
          <Pressable style={focus ? styles.typeFocus : styles.typeNoFocus} onPress={() => setFocus(true)}><Text style={styles.typeText}>ГРУППЫ</Text></Pressable>
        </View>
        <ScrollView>
          {!focus ?
            Object.keys(chatStore.userChats)?.map((keyname: string, index: number) => (
              !Boolean(chatStore.userChats[keyname].image) ? <Dialog key={chatStore.userChats[keyname]._id + index} chat={chatStore.userChats[keyname]} messagesStore={messagesStore.messagesHistory[chatStore.userChats[keyname]._id]} navigation={navigation}/> : <></>
            )) :
            Object.keys(chatStore.userChats)?.map((keyname: string, index: number) => (
              Boolean(chatStore.userChats[keyname].image) ? <Group key={chatStore.userChats[keyname]._id + index} group={chatStore.userChats[keyname]} messagesStore={messagesStore.messagesHistory[chatStore.userChats[keyname]._id]} navigation={navigation}/> : <></>
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
    flexDirection: 'column',
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
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: stylesData.width,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1,
  },
})