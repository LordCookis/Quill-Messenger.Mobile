import * as React from 'react'
import { useState, useContext } from 'react'
import { StyleSheet, View, Dimensions, Image, TextInput, Text, Pressable } from 'react-native'
import { updateUserProfileAPI } from '../api/user-api'
import { setItem } from "../lib/async-storage"
import { useAccountStore } from '../stores/account-store'
import { WarningContext } from '../lib/warning/warning-context'

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
          source={{uri:user.avatar}}
          alt="pfp"/> : <></>}
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
          placeholderTextColor={'#ccc'}
          inputMode='text'
        />
        <TextInput
          style={styles.dataInput}
          value={newData.avatar}
          onChangeText={(e)=>setNewData({...newData, avatar: e})}
          inputMode='text'
        />
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Save changes</Text></Pressable>
      </View>
      <View>
        <TextInput
          style={styles.dataInput}
          placeholder='Введите старый пароль'
          placeholderTextColor={'#cccccc'}
          inputMode='text'
        />
        <TextInput
          style={styles.dataInput}
          placeholder='Введите новый пароль'
          placeholderTextColor={'#cccccc'}
          inputMode='text'
        />
        <TextInput
          style={styles.dataInput}
          placeholder='Подтвердите новый пароль'
          placeholderTextColor={'#cccccc'}
          inputMode='text'
        />
        <Pressable style={styles.saveButton} onPress={update}><Text style={styles.saveText}>Save changes</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  account: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    display: 'flex',
    backgroundColor: '#17191f',
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
    borderColor: '#8d70ff',
  },
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  displayedName: {
    fontSize: 25,
    color: '#ffffff',
  },
  usertag: {
    fontSize: 20,
    color: '#cccccc',
  },
  dataInput: {
    width: 250,
    margin: 5,
    marginLeft: 15,
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: "#1e2027",
  },
  saveButton: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#57546150",
  },
  saveText: {
    fontSize: 15,
    color: '#ffffff',
  },
})