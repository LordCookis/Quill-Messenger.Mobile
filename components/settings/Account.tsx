import { useState, useContext } from 'react'
import { StyleSheet, View, Image, TextInput, Text, Pressable, Modal } from 'react-native'
import { changePasswordAPI, updateUserProfileAPI, deleteAccount } from '../../api/user-api'
import { setItem } from "../../lib/async-storage"
import { useAccountStore } from '../../stores/account-store'
import { WarningContext } from '../../lib/warning/warning-context'
import { stylesData } from '../../styles/stylesData'
import ImagePicker from 'react-native-image-crop-picker'
import { useMessageStore } from '../../stores/messages-store'
import { useChatStore } from '../../stores/chat-store'
import { Socket } from "socket.io-client"
import { SocketContext } from "../../context/socket-context"

export default function Account({navigation}:any){
  const user = useAccountStore()
  const warning:any = useContext(WarningContext)
  const {setUser} = useAccountStore()
  const [newData, setNewData] = useState({
    usertag: user.usertag,
    avatar: user.avatar,
    displayedName: user.displayedName
  })
  const [image, setImage] = useState(user.avatar || {format: null, code: null})
  const [modal, setModal] = useState(false)
  const messagesStore = useMessageStore()
  const chatStore = useChatStore()
  const socket: Socket | any = useContext(SocketContext)
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

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
        setNewData({...newData, avatar: {format: 'png', code: file}})
      }
    } catch (err:any) {
      console.log('Ошибка при выборе файла', err.message)
    }
  }

  const update = async() => {
    const result = await updateUserProfileAPI({_id: user._id, ...newData}, user.host)
    if(result.status >= 400){ return }
    setItem('userdata', result.data)
    setUser(result.data)
  }

  const removeUser = async() => {
    const result = await deleteAccount(user._id, user.host)
    if(!result?.status || result?.status >= 400) {
      console.log('Я ЧЁ ЕМЕЛЯ')
      return
    }
    socket.emit('userDeleted', {userID: user._id})
    const clearData = {
      _id: '',
      usertag: '',
      avatar: {
        format: '',
        code: '',
      },
      displayedName: '',
      host: '',
    }
    messagesStore.clearMessageStore()
    chatStore.clearChatStore()
    setUser(clearData)
    navigation.navigate('Login')
  }

  const updatePassword = async() => {
    if(!passwords.newPassword || !passwords.oldPassword || !passwords.confirmPassword || passwords.newPassword !== passwords.confirmPassword) {return}
    const result = await changePasswordAPI({userId: user._id, oldPassword: passwords.oldPassword, newPassword: passwords.newPassword}, user.host)
    if(result.status === 200){
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } else {
      console.log(result)
    }
  }

  return(
    <View style={styles.account}>
      <View style={styles.userData}>
        <View style={styles.linkUserImage}>
          <Pressable onPress={()=>pickAvatar()}>
            {image.code ? <Image
              style={styles.userImage}
              source={{uri:image.code}}/> : <View style={[styles.userImage]}/>}
          </Pressable>
        </View>
        <View>
          <Text style={styles.displayedName}>{user.displayedName}</Text>
          <Text style={styles.usertag}>{user.usertag}</Text>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.dataInput}
          value={newData.displayedName}
          placeholder={user.usertag}
          onChangeText={(e)=>setNewData({...newData, displayedName: e})}
          placeholderTextColor={stylesData.gray}/>
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Сохранить</Text></Pressable>
      </View>
      <View style={{marginBottom: 50}}>
        <TextInput
          style={styles.dataInput}
          onChangeText={(e)=>setPasswords({...passwords, oldPassword: e})}
          value={passwords.oldPassword}
          placeholder='Введите старый пароль'
          placeholderTextColor={stylesData.gray}
          secureTextEntry={true}/>
        <TextInput
          style={styles.dataInput}
          onChangeText={(e)=>setPasswords({...passwords, newPassword: e})}
          value={passwords.newPassword}
          placeholder='Введите новый пароль'
          placeholderTextColor={stylesData.gray}
          secureTextEntry={true}/>
        <TextInput
          style={styles.dataInput}
          onChangeText={(e)=>setPasswords({...passwords, confirmPassword: e})}
          value={passwords.confirmPassword}
          placeholder='Подтвердите новый пароль'
          placeholderTextColor={stylesData.gray}
          secureTextEntry={true}/>
        <Pressable style={styles.saveButton} onPress={updatePassword}><Text style={styles.saveText}>Сохранить</Text></Pressable>
        <Pressable style={{...styles.saveButton, backgroundColor: '#710707'}} onPress={()=>setModal(true)}><Text style={styles.saveText}>Удалить аккаунт</Text></Pressable>
      </View>
      {modal &&
        <Modal
        animationType="fade"
        transparent={true}
        visible={true}>
        <Pressable style={{...styles.modal, backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={()=>setModal(false)}>
          <View style={{...styles.conteiner, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.deleteCont}>
              <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', marginBottom: 10}}>Удалить аккаунт</Text>
              <Text style={{fontSize: 18, color: '#fff', marginBottom: 10}}>Вы точно хотите удалить этот аккаунт?</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 20, color: '#2692E5'}} onPress={()=>setModal(false)}>Отмена</Text>
                <Text style={{fontSize: 20, color: stylesData.error}} onPress={()=>removeUser()}>Удалить</Text>
              </View>
            </View>
          </View>
        </Pressable>
        </Modal>}
    </View>
  )
}

const styles = StyleSheet.create({
  account: {
    flex: 1,
    backgroundColor: stylesData.accent2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userData: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkUserImage: {
    marginRight: 15,
    padding: 2,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: stylesData.connected,
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  displayedName: {
    fontFamily: 'monospace',
    fontSize: 25,
    color: stylesData.white,
  },
  usertag: {
    fontFamily: 'monospace',
    fontSize: 20,
    color: stylesData.gray,
  },
  dataInput: {
    width: 300,
    margin: 5,
    padding: 10,
    fontFamily: 'monospace',
    fontSize: 15,
    borderRadius: 10,
    color: stylesData.white,
    backgroundColor: stylesData.accent1,
  },
  saveButton: {
    width: 300,
    margin: 5,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: stylesData.loginInput,
  },
  saveText: {
    fontFamily: 'monospace',
    fontSize: 15,
    color: stylesData.white,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  conteiner: {
    height: '100%',
    paddingVertical: 10,
  },
  modalView: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 9999,
  },
  deleteCont: {
    width: stylesData.width*0.7,
    backgroundColor: stylesData.accent1,
    padding: 15,
    borderRadius: 10,
  },
})