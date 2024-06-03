import * as React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Pressable, Dimensions} from "react-native"
import Icon from '../../assets/Icons'
import { useState, useEffect, useContext } from 'react'
import { useChatStore } from '../../stores/chat-store'
import { useAccountStore } from '../../stores/account-store'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../../context/socket-context'
import { WarningContext } from '../../lib/warning/warning-context'
import { fetchUserChatsAPI } from '../../api/chat-api'
import { fetchUserByIdAPI } from '../../api/user-api'
import { netRequestHandler } from '../../utils/net-request-handler'
import { tryCatch } from '../../utils/try-catch'
import { createNewGroupAPI } from '../../api/group-api'
import { stylesData } from '../../styles/stylesData'
import ImagePicker from 'react-native-image-crop-picker'

export default function GroupCreat({navigation}:any) {
  const chatStore = useChatStore()
  const [members, setMembers] = useState<any>([])
  const [groupName, setGroupName] = useState<string>('')
  const user = useAccountStore()
  const [groupMembers, setGroupMembers] = useState<any>([user._id])
  const socket: Socket | any = useContext(SocketContext)
  const warning: any = useContext(WarningContext)
  const [image, setImage] = useState<any>({format: null, code: null})

  useEffect(() => {
    if (!socket?.connected) { return }
    const fetchFriends = async () => {
      const members = Object.values(chatStore.userChats).map((item:any) => item.members)
      const friendsID = members.map((members:any) => members.filter((member:any) => member !== user._id))
      const friends = await Promise.all(friendsID.map(async (friend:any) => {
        const result = await netRequestHandler(() => fetchUserByIdAPI(friend[0]), warning)
        return result.data
      }))
      setMembers(friends)
    }
    fetchFriends()
  }, [])

  const newMember = (memberID:string) => {
    groupMembers.includes(memberID) ? 
      setGroupMembers((prevMembers:any) => prevMembers.filter((id:string) => id !== memberID)) :
      setGroupMembers((prevMembers:any) => [...prevMembers, memberID])
  }

  const pickAvatar = async() => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
        includeBase64: true,
        compressImageQuality: 0.8,
        mediaType: 'photo'
      })
      if (image) {
        const file = `data:${image.mime};base64,${image.data}`
        setImage({format: 'png', code: file})
      }
    } catch (err:any) {
      console.log('Ошибка при выборе файла', err.message)
    }
  }

  const creatNewGroup = () => {
    if(groupMembers.length < 1){return}
    tryCatch(async()=>{ 
      await netRequestHandler(()=>createNewGroupAPI(groupName, image, groupMembers), warning)
      navigation.navigate('DialogList')
    })
  }

  return(
    <View style={styles.groupView}>
      {image.format ? 
      <Image
        style={styles.groupImage}
        source={{uri:image.code}}/> : 
      <Pressable onPress={pickAvatar}><Image
        style={styles.groupImage}
        source={{uri:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'}}/>
      </Pressable>}
      <TextInput
        style={styles.input}
        onChangeText={(e)=>setGroupName(e)}
        placeholder='Название группы'
        placeholderTextColor={'#2c2f38'}
      />
      {members.map((member:any)=>{
        return(
          <Pressable onPress={()=>newMember(member._id)}>
          <View style={groupMembers.includes(member._id) ? styles.memberTab : styles.member}>
            <Image style={[{height: 45, width: 45, borderRadius: 50}]} source={{uri:`data:image/${member?.avatar.format};base64,${member?.avatar.code}`}}/>
            <View style={styles.nameView}>
              <Text style={styles.name}>{member.displayedName || member.usertag}</Text>
              {member.displayedName ? <Text style={styles.tag}>{member.usertag}</Text> : null}
            </View>
          </View>
          </Pressable>
        )
      })}
      <Text onPress={creatNewGroup} style={styles.create}>Создать группу</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  groupView: {
    flex: 1,
    paddingTop: 15,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: stylesData.accent2,
  },
  groupImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  input: {
    margin: 5,
    padding: 10,
    fontFamily: 'monospace',
    fontSize: 20,
    width: '70%',
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: stylesData.accent1,
    textAlign: 'center',
  },
  title: {
    marginBottom: 5,
    color: '#ffffff',
    fontSize: 25,
  },
  member: {
    width: stylesData.width * 0.95,
    padding: 10,
    margin: 5,
    backgroundColor: stylesData.accent2,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  memberTab: {
    width: stylesData.width * 0.95,
    padding: 10,
    margin: 5,
    backgroundColor: stylesData.accent1,
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
  create: {
    padding: 10,
    margin: 5,
    backgroundColor: stylesData.dialogActive,
    fontFamily: 'monospace',
    fontSize: 20,
    color: '#ffffff',
    borderRadius: 10,
  },
})