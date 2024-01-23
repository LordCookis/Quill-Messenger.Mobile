import * as React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { useContext, useEffect, useState } from "react"
import Icon from "../../assets/Icons"
import { loginAPI, registerAPI } from "../../api/user-api"
import { getItem, setItem } from "../../lib/async-storage"
import { useAccountStore } from "../../stores/account-store"
import { WarningContext } from '../../lib/warning/warning-context'
import { inputFilter } from '../../utils/input-filter'
import { tryCatch } from '../../utils/try-catch'
import { netRequestHandler } from '../../utils/net-request-handler'
import { warningHook } from '../../lib/warning/warning-context'
import { userData } from '../../types/types'

export default function Login({navigation}:any) {
  const [tab, setTab] = useState<boolean>(false)
  const warning = useContext<warningHook>(WarningContext)
  const {setUser} = useAccountStore()
  const [userInputs, setUserInputs] = useState({
    usertag: "",
    password: "",
    confirmPassword: "",
  })
  const [inputFocus, setInputFocus] = useState<number>(0)
  const [rawInput, setRawInput] = useState<string>('')

  useEffect(() => {
    setUserInputs({...userInputs, usertag: inputFilter(rawInput)})
  }, [rawInput])

  const passLoginScreen = (userdata:userData) => {
    setItem('userdata', userdata)
    setUser(userdata)
    navigation.navigate('DialogList', {user: userdata})
  }

  useEffect(()=>{
    const userdata:any = getItem('userdata')
    if(!userdata._A){ return }
    passLoginScreen(userdata)
  }, [])

  const registerNewAccount = async() => {
    tryCatch(async()=>{
      const result = await netRequestHandler(()=>registerAPI(userInputs), warning)
      passLoginScreen(result.data)
    })
  }

  const loginAccount = async() => {
    tryCatch(async()=>{
      const result = await netRequestHandler(()=>loginAPI(userInputs), warning)
      passLoginScreen(result.data)
    })
  }

  const handleFocus = (inputNumber:number) => { setInputFocus(inputNumber) }

  return(
    <View style={styles.loginPage}>
      <View style={styles.loginContent}>
        <View style={styles.loginView}>
          <View style={styles.titleView}>
            <Icon.Quill/><Text style={styles.loginTitle}> Quill Messenger</Text>
          </View>
          <Text style={[{margin: 5, color: '#ffffff', fontSize: 18, fontWeight: 'bold',}]}>Welcome, User!</Text>
          <Text style={styles.description}>
            We're glad to see you here! {'\n'}
            Log In or create a new account!{'\n'}
            Other people are waiting for you!
          </Text>
        </View>
        <TextInput
          onChangeText={(e) => setRawInput(e)}
          value={userInputs.usertag}
          style={[styles.loginInput, {backgroundColor: inputFocus === 1 ? '#c577e450' : '#7d4ba746'}]}
          placeholder='User Tag'
          placeholderTextColor={'#cccccc'}
          onFocus={()=>handleFocus(1)}
        />
        <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, password: inputFilter(e)})}
          value={userInputs.password}
          style={[styles.loginInput, {backgroundColor: inputFocus === 2 ? '#c577e450' : '#7d4ba746'}]}
          placeholder='Password'
          placeholderTextColor={'#cccccc'}
          secureTextEntry={true}
          onFocus={()=>handleFocus(2)}
        />
        {!tab || <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, confirmPassword: inputFilter(e)})}
          value={userInputs.confirmPassword}
          style={[styles.loginInput, {backgroundColor: inputFocus === 3 ? '#c577e450' : '#7d4ba746'}]}
          placeholder='Confirm password'
          placeholderTextColor={'#cccccc'}
          secureTextEntry={true}
          onFocus={()=>handleFocus(3)}
        />}
        <Pressable><Text 
          onPress={tab ? registerNewAccount : loginAccount}
          style={styles.loginButton}
        >{tab ? "Register" : "Login"}</Text></Pressable>
        <Pressable><Text onPress={()=>setTab(!tab)} style={styles.tabButton}>{!tab ? "I don't have an account!" : "I have an account!"}</Text></Pressable>
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
    backgroundColor: '#18191e',
    fontFamily: 'monospace',
    color: '#fff',
    fontSize: 15,
  },
  loginView: {
    marginVertical: 15,
    width: Dimensions.get('window').width * 0.85,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTitle: {
    color: '#c577e4',
    fontFamily: 'monospace',
    fontSize: 25,
  },
  tabButton: {
    margin: 10,
    color: '#c577e4',
    fontFamily: 'monospace',
    fontSize: 15,
  },
  loginContent: {
    padding: 5,
    backgroundColor: '#1d2027',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginInput: {
    padding: 10,
    margin: 5,
    width: 280,
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
    backgroundColor: '#302e39',
    borderRadius: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: '#cccccc',
    fontSize: 15,
  },
  description: {
    color: '#ffffff',
    fontSize: 15,
  },
  warningLabels: {
    maxWidth: 300,
    fontFamily: 'monospace',
    fontSize: 13,
    color: 'coral'
  }
})
