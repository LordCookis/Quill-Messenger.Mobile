import * as React from 'react'
import { View, Image, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import Icon from '../assets/Icons'
import { fetchUserGroupsAPI } from '../api/group-api'
import { useGroupStore } from '../stores/group-store'
import { useAccountStore } from '../stores/account-store'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../context/socket-context'
import { WarningContext } from '../lib/warning/warning-context'
import { tryCatch } from '../utils/try-catch'
import { netRequestHandler } from '../utils/net-request-handler'

export default function Group({group, groupStore, navigation}:any){
  const {setActiveGroup, activeGroup}:any = useGroupStore()
  const socket: Socket | any = useContext(SocketContext)
  const user = useAccountStore()
  const warning: any = useContext(WarningContext)
  const [messageData, setMessageData] = useState({
    senderID: "",
    text: "",
    time: "",
  })

  useEffect(()=>{console.log(group)},[])
  
  const selectGroup = () => {
    //navigation.navigate('GroupBox', {groupID: group._id})
  }

  useEffect(()=>{
    if(!groupStore?.messages?.length){return}
    const timeDate = new Date(groupStore?.messages[groupStore?.messages.length-1].createdAt)
    setMessageData({
      senderID: groupStore?.messages[groupStore?.messages.length-1].senderID,
      text: groupStore?.messages[groupStore?.messages.length-1].text,
      time: `${timeDate.getHours()}:${timeDate.getMinutes() < 10 ? "0" + timeDate.getMinutes() : timeDate.getMinutes()}`
    })
  }, [groupStore])

  const Typing = () => <Text style={styles.typing}><Icon.AnimatedPen/> Typing...</Text> 
  const Draft = () => <><Text style={styles.draft}>{"Draft: "}</Text>{groupStore?.inputMessage}</>
  const Message = () => <><Text style={styles.sentFromMe}>{messageData.senderID == user._id ? "You: " : ""}</Text>
  {messageData?.text?.length ? messageData.text : "No messages yet..."}</>

  return(
    <Pressable onPress={selectGroup}>
    <View style={styles.messageBlock}>
      {group?.image ? <Image style={[{height: 40, width: 40, borderRadius: 50}]} source={{uri: group?.image}} alt="pfp"/> : <></>}
      <View style={styles.messageContent}>
        <View style={styles.top}>
          <Text style={styles.name}>{group?.name}</Text>
          <Text style={styles.time}>{messageData?.time?.length ? messageData.time : ""}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.message}>
            {groupStore?.isTyping ?
              <Typing/> :
              groupStore?.inputMessage.length && activeGroup.chat._id != group._id ?
                <Draft/> :
                <Message/>
            }
          </Text>
          <Text style={styles.status}>0</Text>
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
  typing: {
    color: '#c577e4',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    marginRight: 4,
  },
  draft: {
    color: '#e73f3f',
  }
})