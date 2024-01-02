import { useChatStore } from '../stores/chat-store'
import { useAccountStore } from '../stores/account-store'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions } from 'react-native'
import Message from './Messege'
import Icon from "../assets/Icons"
import { createChat, getChats } from '../api/chat-api'
import { inputFilter } from '../utils/input-filters'
import { fetchUserTag } from '../api/user-api'
import { WarningContext } from '../lib/warning/warning-context'

export default function ChatList({navigation}:any){
  const {userChats, setUserChats, addNewChat}:any = useChatStore()
  const warning:any = useContext(WarningContext)
  const [search, setSearch] = useState<string>("")
  const user:any = useAccountStore()

  const fetchChats = async() => {
    const result = await getChats(user._id)
    setUserChats(result.data.chats)
  }

  const addNewUserChat = async() => {
    if(search == user._id) { return }
    console.log(search)
    const secondUser = await fetchUserTag(search)
    if(secondUser.status >= 400){
      //warning.showWindow({title: `User doesn't exist`, message: `The user "${search}" you've been searching for doesn't exist :<`})
      alert("Ощипка")
      return
    }
    const doesChatExist = userChats.filter((chat: any) => {
      if(chat.members[0] == secondUser.data._id || chat.members[1] == secondUser.data._id){
        //router.push(`/chat/${chat._id}`)
        console.log("FOUND THE SAME CHAT, REDIRECTING")
        return true
      }
    })
    if(doesChatExist.length){return}
    const newChat = await createChat(user._id, secondUser.data._id)
    addNewChat(newChat.data)
  }

  useEffect(()=>{
    !userChats.length && user._id && fetchChats()
  }, [user._id, userChats])

  return (
    <View style={styles.chatlist}>
      <Text style={styles.chatHeader}>Messages</Text>
      <View style={styles.searchBlock}>
        <Pressable onPress={()=>{navigation.navigate('Menu')}}>
          <Icon.AddUser/>
        </Pressable>
        <TextInput
          style={styles.searchInput}
          onChangeText={(e) => setSearch(inputFilter(e))}
          placeholder="Search by tag"
          placeholderTextColor={'#2c2f38'}
          inputMode="text"
        />
        <Pressable onPress={addNewUserChat}>
          <Icon.AddUser/>
        </Pressable>
      </View>
      <View style={styles.block}>
        <Text style={styles.legend}><Icon.Letter/> ALL MESSAGES</Text>
        {userChats?.map((chat: any) => (
          <Message key={chat._id} chat={chat} user={user} navigation={navigation}/>
        ))}
      </View>
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
    fontFamily: 'monospace',
    fontSize: 30,
    color: '#ffffff',
  },
  searchBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    margin: 5,
    padding: 10,
    fontSize: 13,
    width: '70%',
    borderWidth: 1,
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
})
