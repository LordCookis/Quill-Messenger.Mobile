import { useState, useContext } from 'react'
import { StyleSheet, View, Image, TextInput, Text, Pressable, Modal } from 'react-native'
import { updateUserProfileAPI } from '../../api/user-api'
import { setItem } from "../../lib/async-storage"
import { useAccountStore } from '../../stores/account-store'
import { WarningContext } from '../../lib/warning/warning-context'
import { stylesData } from '../../styles/stylesData'
import ImagePicker from 'react-native-image-crop-picker'

export default function Account(){
  const user = useAccountStore()
  const warning:any = useContext(WarningContext)
  const {setUser} = useAccountStore()
  const [newData, setNewData] = useState({
    usertag: user.usertag,
    avatar: user.avatar,
    displayedName: user.displayedName
  })
  const [image, setImage] = useState(user.avatar || {format: null, code: null})

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
        const format:any = image.mime.split('/')[1]
        const base64:any = image.data
        setImage({format: format, code: base64})
        setNewData({...newData, avatar: {format: format, code: base64}})
      }
    } catch (err:any) {
      console.log('Ошибка при выборе файла', err.message)
    }
  }

  const update = async() => {
    const result = await updateUserProfileAPI({_id: user._id, ...newData})
    if(result.status >= 400){
      warning.showWindow({title: "Couldn't update", message: `Something went wrong!: ${result.message}`})
      return
    }
    setItem('userdata', result.data)
    setUser(result.data)
  }

  return(
    <View style={styles.account}>
      <View style={styles.userData}>
        <View style={styles.linkUserImage}>
          <Pressable onPress={()=>pickAvatar()}>
            {image.format ? <Image
              style={styles.userImage}
              source={{uri:`data:image/${image.format};base64,${image.code}`}}/> : <></>}
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
      <View>
        <TextInput
          style={styles.dataInput}
          placeholder='Введите старый пароль'
          placeholderTextColor={stylesData.gray}/>
        <TextInput
          style={styles.dataInput}
          placeholder='Введите новый пароль'
          placeholderTextColor={stylesData.gray}/>
        <TextInput
          style={styles.dataInput}
          placeholder='Подтвердите новый пароль'
          placeholderTextColor={stylesData.gray}/>
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Сохранить</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  account: {
    flex: 1,
    backgroundColor: stylesData.accent2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  userData: {
    margin: 15,
    marginTop: 30,
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
})