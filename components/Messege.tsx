import * as React from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { fetchUserId } from '../api/user-api'
import { useChatStore } from '../stores/chat-store'
import Icon from '../assets/Icons'

export default function Message({chat, user}: any){
  const [userData, setUserData]: any = useState()
  const {setActiveChat}: any = useChatStore()
  
  const fetchData = async() => {
    const userID = chat.members[0] != user._id ? chat.members[0] : chat.members[1]
    const result = await fetchUserId(userID)
    setUserData(result.data)
  }

  const selectChat = () => {
    setActiveChat({chat: chat, friend: userData})
  }

  useEffect(()=>{
    !userData && fetchData()
  }, [userData])

  return(
    <View style={styles.messageBlock}>
      <Image style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri: userData?.avatar}}/>
      <View style={styles.messageContent}>
        <View style={styles.top}>
          <Text style={styles.name}>{userData?.displayedName}</Text>
          <Text style={styles.time}>12:00 AM</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.message}>Сообщеньеце</Text>
          <Text style={styles.status}><Icon.DoubleCheck/></Text>
        </View>
      </View>
    </View>
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
    color: '#808080'
  },
  status: {},
})