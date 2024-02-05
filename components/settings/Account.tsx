import { useState, useContext } from 'react'
import { StyleSheet, View, Image, TextInput, Text, Pressable } from 'react-native'
import { updateUserProfileAPI } from '../../api/user-api'
import { setItem } from "../../lib/async-storage"
import { useAccountStore } from '../../stores/account-store'
import { WarningContext } from '../../lib/warning/warning-context'
import { stylesData } from '../../styles/stylesData'

export default function Account(){
  const user = useAccountStore()
  const warning:any = useContext(WarningContext)
  const {setUser} = useAccountStore()
  const [newData, setNewData] = useState({
    usertag: user.usertag,
    avatar: user.avatar,
    displayedName: user.displayedName
  })

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
          {user.avatar ? <Image
          style={styles.userImage}
          source={{uri:user.avatar}}/> : <></>}
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
        <TextInput
          style={styles.dataInput}
          value={newData.avatar}
          onChangeText={(e)=>setNewData({...newData, avatar: e})}/>
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Save changes</Text></Pressable>
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
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Save changes</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  account: {
    height: stylesData.height,
    width: stylesData.width,
    display: 'flex',
    backgroundColor: stylesData.accent2,
    flexDirection: 'column',
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
    fontSize: 25,
    color: stylesData.white,
  },
  usertag: {
    fontSize: 20,
    color: stylesData.gray,
  },
  dataInput: {
    width: 250,
    margin: 5,
    marginLeft: 15,
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    color: stylesData.white,
    backgroundColor: stylesData.accent1,
  },
  saveButton: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: stylesData.loginInput,
  },
  saveText: {
    fontSize: 15,
    color: stylesData.white,
  },
})