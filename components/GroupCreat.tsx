import * as React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Pressable, Dimensions} from "react-native"
import Icon from '../assets/Icons'
import { useState, useEffect, useContext } from 'react'
import { useChatStore } from '../stores/chat-store'
import { useAccountStore } from '../stores/account-store'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../context/socket-context'
import { WarningContext } from '../lib/warning/warning-context'
import { fetchUserByIdAPI } from '../api/user-api'
import { netRequestHandler } from '../utils/net-request-handler'
import { tryCatch } from '../utils/try-catch'
import { createNewGroupAPI } from '../api/group-api'

export default function GroupCreat({navigation}:any) {
  const {userChats}:any = useChatStore()
  const [members, setMembers] = useState<any>([])
  const [groupName, setGroupName] = useState<string>('')
  const user = useAccountStore()
  const [groupMembers, setGroupMembers] = useState<any>([user._id])
  const socket: Socket | any = useContext(SocketContext)
  const warning: any = useContext(WarningContext)

  useEffect(()=>{
    if(members.length || !socket?.connected){return}
    userChats.map((chat:any) => { 
      const userID = chat.members.filter((userID:string) => userID !== user._id)[0]
      tryCatch(async()=>{
        const result = await netRequestHandler(fetchUserByIdAPI(userID), warning)
        setMembers((prevMembers:any) => [...prevMembers, result.data])
      })
    })
  }, [])

  const newMember = (memberID:string) => {
    groupMembers.includes(memberID) ? 
      setGroupMembers((prevMembers:any) => prevMembers.filter((id:string) => id !== memberID)) :
      setGroupMembers((prevMembers:any) => [...prevMembers, memberID])
    console.log(groupMembers.length)
  }

  const creatNewGroup = () => {
    if(groupMembers.length < 1){return}
    tryCatch(async()=>{ 
      await netRequestHandler(createNewGroupAPI(groupName, 'https://i.imgur.com/S5OviJ6h.jpg', groupMembers), warning)
      navigation.navigate('DialogList')
    })
  }

  return(
    <View style={styles.groupView}>
      <TextInput
        style={styles.input}
        onChangeText={(e)=>setGroupName(e)}
        placeholder='Group name'
        placeholderTextColor={'#2c2f38'}
        inputMode="text"
      />
      <Text style={styles.title}>Кого добавить?</Text>
      {members.map((member:any)=>{
        return(
          <Pressable onPress={()=>newMember(member._id)}>
          <View style={groupMembers.includes(member._id) ? styles.memberTab : styles.member}>
            <Image style={[{height: 45, width: 45, borderRadius: 50}]} source={{uri: member?.avatar}}/>
            <View style={styles.nameView}>
              <Text style={styles.name}>{member.displayedName || member.usertag}</Text>
              {member.displayedName ? <Text style={styles.tag}>{member.usertag}</Text> : null}
            </View>
          </View>
          </Pressable>
        )
      })}
      <Pressable onPress={creatNewGroup}><Icon.AddUser/></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  groupView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingTop: 15,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#17191f',
  },
  input: {
    margin: 5,
    padding: 10,
    fontSize: 20,
    width: '70%',
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
    textAlign: 'center',
  },
  title: {
    marginBottom: 5,
    color: '#ffffff',
    fontSize: 25,
  },
  member: {
    width: Dimensions.get('window').width * 0.9,
    padding: 5,
    margin: 5,
    backgroundColor: '#17191f',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  memberTab: {
    width: Dimensions.get('window').width * 0.9,
    padding: 5,
    margin: 5,
    backgroundColor: '#1e2027',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameView: {
    marginLeft: 10,
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
  },
  tag: {
    color: '#808080',
    fontSize: 15,
  },
})