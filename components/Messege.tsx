import * as React from 'react'
import { View, Image, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { fetchUserId } from '../api/user-api'
import { useChatStore } from '../stores/chat-store'
import { useAccountStore } from '../stores/account-store'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../context/socket-context'
import { WarningContext } from '../lib/warning/warning-context'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'
import { useMessageStore } from '../stores/messages-store'
import Icon from '../assets/Icons'

export default function Message({chat, navigation}:any){
  const [OpponentData, setOpponentData]:any = useState()
  const {setActiveChat}:any = useChatStore()
  const {messagesHistory}:any = useMessageStore()
  const socket: Socket | any = useContext(SocketContext)
  const user = useAccountStore()
  const warning: any = useContext(WarningContext)
  const [messageData, setMessageData] = useState({
    senderID: "",
    text: "",
    time: "",
  })
  
  const fetchData = async() => {
    if(!socket?.connected){return}
    const userID = chat.members[0] != user._id ? chat.members[0] : chat.members[1]
    tryCatch(async()=>{
      const result = await netRequestHandler(fetchUserId(userID), warning)
      setOpponentData(result.data)
    })
  }

  const selectChat = () => {
    setActiveChat({chat: chat, friend: OpponentData})
    navigation.navigate('ChatBox', {ChatID: chat._id})
  }

  useEffect(()=>{
    if(!messagesHistory[chat._id]?.length){return}
    const timeDate = new Date(messagesHistory[chat._id][messagesHistory[chat._id].length-1].createdAt)
    setMessageData({
      senderID: messagesHistory[chat._id][messagesHistory[chat._id].length-1].senderID,
      text: messagesHistory[chat._id][messagesHistory[chat._id].length-1].text,
      time: `${timeDate.getHours()}:${timeDate.getMinutes() < 10 ? "0" + timeDate.getMinutes() : timeDate.getMinutes()}`
    })
  }, [messagesHistory[chat._id]])

  useEffect(()=>{
    !OpponentData && fetchData()
  }, [OpponentData, socket?.connected])

  return(
    <Pressable onPress={selectChat}>
    <View style={styles.messageBlock}>
      <Image style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri: OpponentData?.avatar}}/>
      <View style={styles.messageContent}>
        <View style={styles.top}>
          <Text style={styles.name}>{OpponentData?.displayedName}</Text>
          <Text style={styles.time}>{messageData?.time?.length ? messageData.time : ""}</Text>
        </View>
        <View style={styles.bottom}>
        <Text style={styles.message}><Text style={styles.sentFromMe}>{messageData.senderID == user._id ? "You: " : ""}</Text>{messageData?.text?.length ? messageData.text : "No messages yet..."}</Text>
          <Text style={styles.status}><Icon.DoubleCheck/></Text>
        </View>
      </View>
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  messageBlock: {
    width: Dimensions.get('window').width / 1.125,
    paddingVertical: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e2027',
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
    color: '#808080',
  },
  sentFromMe: {
    color: '#c577e4',
  },
  status: {
    marginTop: 5,
  },
})