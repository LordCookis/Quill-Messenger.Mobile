import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import * as React from 'react'
import { account } from "../api/user-api"
import { getItem, setItem } from "../lib/async-storage"
import Icon from "../assets/Icons"
import { useAccountStore } from "../stores/account-store"
import { useContext, useEffect, useState } from "react"
import { inputFilter } from '../utils/input-filters'
import ChatList from './ChatList'

export default function Login({navigation}:any) {
  const [tab, setTab] = useState(false)
  //const warning:any = useContext(WarningContext)
  const {setUser}: any = useAccountStore()
  const [userInputs, setUserInputs] = useState({
    usertag: "",
    password: "",
    confirmPassword: "",
  })
  const [inputFocus, setInputFocus] = useState<number>(0)
  const [register, setRegister] = useState<boolean>(false)

  //useEffect(()=>{
  //  const userdata = getItem('userdata')
  //  if(!userdata){return}
  //  passLoginScreen(userdata)
  //}, [])

  const passLoginScreen = (userdata: any) => {
    setItem('userdata', userdata)
    setUser(userdata)
    setRegister(true)
  }

  const accountAction = async(action: boolean) => {
    const result = await account(userInputs, action)
    if(result.status >= 400){ return }
    passLoginScreen(result.data)
  }

  const handleFocus = (inputNumber:number) => { setInputFocus(inputNumber) }

  return(
    <>{!register ? 
    <View style={styles.loginPage}>
      <Text style={styles.loginTitle}><Icon.Quill/>Quill Messenger</Text>
      <View style={styles.tabContent}>
        <Pressable><Text onPress={()=>setTab(false)} style={!tab ? styles.activeTab : styles.tabButton}>Login</Text></Pressable>
        <Pressable><Text onPress={()=>setTab(true)} style={tab ? styles.activeTab : styles.tabButton}>Register</Text></Pressable>
      </View>
      <View style={styles.loginContent}>
        <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, usertag: inputFilter(e)})}
          style={[styles.loginInput, {backgroundColor: inputFocus === 1 ? '#9385ca50' : '#9385ca00'}]}
          placeholder='User Tag'
          placeholderTextColor={'#ccc'}
          inputMode='text'
          onFocus={() => handleFocus(1)}
        />
        <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, password: inputFilter(e)})}
          style={[styles.loginInput, {backgroundColor: inputFocus === 2 ? '#9385ca50' : '#9385ca00'}]}
          placeholder='Password'
          placeholderTextColor={'#ccc'}
          inputMode='text'
          secureTextEntry={true}
          onFocus={() => handleFocus(2)}
        />
        {!tab || <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, confirmPassword: inputFilter(e)})}
          style={[styles.loginInput, {backgroundColor: inputFocus === 3 ? '#9385ca50' : '#9385ca00'}]}
          placeholder='Confirm password'
          placeholderTextColor={'#ccc'}
          inputMode='text'
          secureTextEntry={true}
          onFocus={() => handleFocus(3)}
        />}
        <Pressable><Text 
          onPress={tab ? ()=>accountAction(true) : ()=>accountAction(false)}
          style={styles.loginButton}
        >{tab ? "Register" : "Login"}</Text></Pressable>
      </View>
      {!tab || <View>
        {userInputs.usertag.length < 3 ? <Text style={styles.warningLabels}>* Usertag must be longer than 3 characters!</Text> : <></>}
        {userInputs.usertag.length > 30 ? <Text  style={styles.warningLabels}>* Usertag must be no more than 30 characters long!</Text> : <></>}
        {userInputs.password.length < 8 ? <Text  style={styles.warningLabels}>* Password must be longer than 8 characters!</Text> : <></>}
        {userInputs.password !== userInputs.confirmPassword ? <Text style={styles.warningLabels}>* Passwords do not match!</Text> : <></>}
      </View>}
    </View>
    : <ChatList navigation={navigation}/>}</>
  )
}

const styles = StyleSheet.create({
  loginPage: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17191f',
    fontFamily: 'monospace',
    color: '#fff',
    fontSize: 15,
  },
  loginTitle: {
    marginVertical: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    color: '#fff',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 20,
  },
  tabContent: {
    width: 315,
    padding: 5,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  tabButton: {
    minWidth: 150,
    paddingVertical: 5,
    paddingHorizontal: 50,
    backgroundColor: '#776ca550',
    color: '#fff',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 15,
  },
  activeTab: {
    minWidth: 150,
    paddingVertical: 5,
    paddingHorizontal: 50,
    backgroundColor: '#9385ca50',
    color: '#fff',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 15,
  },
  loginContent: {
    padding: 5,
    backgroundColor: '#776ca550',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  loginInput: {
    padding: 10,
    margin: 5,
    width: 280,
    backgroundColor: '#9385ca50',
    borderRadius: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 15,
  },
  loginButton: {
    width: 280,
    padding: 10,
    margin: 5,
    backgroundColor: '#57546150',
    borderRadius: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#ccc',
    fontSize: 15,
  },
  warningLabels: {
    maxWidth: 200,
    color: 'coral'
  }
})
