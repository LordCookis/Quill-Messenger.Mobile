import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import * as React from 'react'
import { account } from "../api/user-api"
import { getItem, setItem } from "../lib/async-storage"
import Icon from "../assets/Icons"
import { useAccountStore } from "../stores/account-store"
import { useContext, useEffect, useState } from "react"
import { inputFilter } from '../utils/input-filter'
import { WarningContext } from '../lib/warning/warning-context'

export default function Login({navigation}:any) {
  const [tab, setTab] = useState(false)
  const warning:any = useContext(WarningContext)
  const {setUser}:any = useAccountStore()
  const [userInputs, setUserInputs] = useState({
    usertag: "",
    password: "",
    confirmPassword: "",
  })
  const [inputFocus, setInputFocus] = useState<number>(0)
  const [rawInput, setRawInput] = useState('')

  //useEffect(()=>{
  //  const userdata = getItem('userdata')
  //  if(!userdata){return}
  //  passLoginScreen(userdata) 
  //}, [])

  useEffect(() => {
    setUserInputs({...userInputs, usertag: inputFilter(rawInput)})
  }, [rawInput])

  const passLoginScreen = (userdata:any) => {
    setItem('userdata', userdata)
    setUser(userdata)
    navigation.navigate('ChatList', {user: userdata})
  }

  const accountAction = async(action:boolean) => {
    const result = await account(userInputs, action)
    if(result.status >= 400){ return }
    passLoginScreen(result.data)
  }

  const handleFocus = (inputNumber:number) => { setInputFocus(inputNumber) }

  return(
    <View style={styles.loginPage}>
      <View style={styles.loginView}><Icon.Quill/><Text style={styles.loginTitle}>Quill Messenger</Text></View>
      <View style={styles.tabContent}>
        <Pressable><Text onPress={()=>setTab(false)} style={!tab ? styles.activeTab : styles.tabButton}>Login</Text></Pressable>
        <Pressable><Text onPress={()=>setTab(true)} style={tab ? styles.activeTab : styles.tabButton}>Register</Text></Pressable>
      </View>
      <View style={styles.loginContent}>
        <TextInput
          onChangeText={(e) => setRawInput(e)}
          value={userInputs.usertag}
          style={[styles.loginInput, {backgroundColor: inputFocus === 1 ? '#9385ca50' : '#9385ca00'}]}
          placeholder='User Tag'
          placeholderTextColor={'#cccccc'}
          inputMode='text'
          onFocus={()=>handleFocus(1)}
        />
        <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, password: inputFilter(e)})}
          value={userInputs.password}
          style={[styles.loginInput, {backgroundColor: inputFocus === 2 ? '#9385ca50' : '#9385ca00'}]}
          placeholder='Password'
          placeholderTextColor={'#cccccc'}
          inputMode='text'
          secureTextEntry={true}
          onFocus={()=>handleFocus(2)}
        />
        {!tab || <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, confirmPassword: inputFilter(e)})}
          value={userInputs.confirmPassword}
          style={[styles.loginInput, {backgroundColor: inputFocus === 3 ? '#9385ca50' : '#9385ca00'}]}
          placeholder='Confirm password'
          placeholderTextColor={'#cccccc'}
          inputMode='text'
          secureTextEntry={true}
          onFocus={()=>handleFocus(3)}
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
  loginView: {
    marginVertical: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 25,
  },
  tabContent: {
    width: 315,
    padding: 5,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  tabButton: {
    width: 158,
    paddingVertical: 5,
    backgroundColor: '#776ca550',
    color: '#ffffff',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: 15,
  },
  activeTab: {
    width: 158,
    paddingVertical: 5,
    backgroundColor: '#9385ca50',
    color: '#ffffff',
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
    color: '#cccccc',
    fontSize: 15,
  },
  warningLabels: {
    maxWidth: 200,
    color: 'coral'
  }
})
