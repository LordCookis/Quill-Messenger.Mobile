import * as React from 'react'
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
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
import { stylesData } from '../../styles/stylesData'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({navigation}:any) {
  const [tab, setTab] = useState<boolean>(false)
  const warning = useContext<warningHook>(WarningContext)
  const [userInputs, setUserInputs] = useState({
    usertag: "",
    password: "",
    confirmPassword: "",
    host: "",
  })
  const [inputFocus, setInputFocus] = useState<number>(0)
  const [rawInput, setRawInput] = useState<string>('')
  const user = useAccountStore()
  const [gay, setGay] = useState<any>('Я гей')

  useEffect(() => {
    setUserInputs({...userInputs, usertag: inputFilter(rawInput)})
  }, [rawInput])

  const passLoginScreen = (userdata:userData) => {
    setItem('userAccount', userdata)
    user.setUser(userdata)
    setUserInputs({
      usertag: "",
      password: "",
      confirmPassword: "",
      host: "",
    })
    navigation.navigate('DialogList')
  }

  const registerNewAccount = async() => {
    try {
      const result = await registerAPI(userInputs, userInputs.host)
      passLoginScreen({...result.data, host: userInputs.host})
    } catch(err:any) { console.log('=(') }
  }

  const loginAccount = async() => {
    try {
      const result = await loginAPI(userInputs, userInputs.host)
      if (result.status !== 200) { setGay(result.message) }
      else { passLoginScreen({...result.data, host: userInputs.host}) }
    } catch(err:any) { 
      console.log(err)
      setGay(err)
    }
  }

  const handleFocus = (inputNumber:number) => { setInputFocus(inputNumber) }

  return(
    <View style={styles.loginPage}>
      <View style={styles.loginContent}>
        <View style={styles.loginView}>
          <View style={styles.titleView}>
            <Icon.Quill/><Text style={styles.loginTitle}> Quill Messenger</Text>
          </View>
          <Text style={[{margin: 5, color: '#ffffff', fontSize: 18, fontWeight: 'bold',}]}>Добро пожаловать!</Text>
          <Text style={styles.description}>
            Мы рады видеть вас здесь! {'\n'}
            Войдите или создайте новый аккаунт!{'\n'}
            Другие пользователи уже ждут вас!
          </Text>
        </View>
        <TextInput
          onChangeText={(e)=>setRawInput(e)}
          value={userInputs.usertag}
          style={[styles.loginInput, {backgroundColor: inputFocus === 1 ? stylesData.messageInputHover : stylesData.loginInput}]}
          placeholder='Тэг'
          placeholderTextColor={'#cccccc'}
          onFocus={()=>handleFocus(1)}/>
        <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, password: inputFilter(e)})}
          value={userInputs.password}
          style={[styles.loginInput, {backgroundColor: inputFocus === 2 ? stylesData.messageInputHover : stylesData.loginInput}]}
          placeholder='Пароль'
          placeholderTextColor={'#cccccc'}
          secureTextEntry={true}
          onFocus={()=>handleFocus(2)}/>
        {!tab || <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, confirmPassword: inputFilter(e)})}
          value={userInputs.confirmPassword}
          style={[styles.loginInput, {backgroundColor: inputFocus === 3 ? stylesData.messageInputHover : stylesData.loginInput}]}
          placeholder='Подтвердите пароль'
          placeholderTextColor={'#cccccc'}
          secureTextEntry={true}
          onFocus={()=>handleFocus(3)}
        />}
        <TextInput
          onChangeText={(e)=>setUserInputs({...userInputs, host: e})}
          value={userInputs.host}
          style={[styles.loginInput, {backgroundColor: inputFocus === 4 ? stylesData.messageInputHover : stylesData.loginInput}]}
          placeholder='Хост'
          placeholderTextColor={'#cccccc'}
          onFocus={()=>handleFocus(4)}/>
        <Text
          onPress={tab ? registerNewAccount : loginAccount}
          style={(!userInputs.usertag || !userInputs.password.length) ? styles.loginButton : styles.activeButton}
          disabled={!userInputs.usertag || !userInputs.password.length}
        >{tab ? "Зарегистрироваться" : "Войти"}</Text>
        <Text onPress={()=>setTab(!tab)} style={styles.tabButton}>{!tab ? "У меня нет аккаунта!" : "У меня есть аккаунт!"}</Text>
      </View>
      {!tab || <View>
        {userInputs.usertag.length < 3 ? <Text style={styles.warningLabels}>* Ваш тэг должен быть длинее 3-х символов!</Text> : <></>}
        {userInputs.usertag.length > 30 ? <Text style={styles.warningLabels}>* Ваш тэг должен быть меньше 30-ти символов!</Text> : <></>}
        {userInputs.password.length < 8 ? <Text style={styles.warningLabels}>* Ваш пароль должен быть длиннее 8 символов!</Text> : <></>}
        {userInputs.password !== userInputs.confirmPassword ? <Text style={styles.warningLabels}>* Пароли не совподают!</Text> : <></>}
      </View>}
      <Text style={styles.warningLabels}>{gay}</Text>
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
    backgroundColor: stylesData.accent2,
    fontFamily: 'monospace',
    color: stylesData.white,
    fontSize: 15,
  },
  loginView: {
    width: stylesData.width * 0.85,
    marginVertical: 15,
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
    color: stylesData.appmessage,
    fontFamily: 'monospace',
    fontSize: 25,
  },
  tabButton: {
    margin: 10,
    color: stylesData.appmessage,
    fontFamily: 'monospace',
    fontSize: 15,
  },
  loginContent: {
    padding: 5,
    backgroundColor: stylesData.accent1,
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
    color: stylesData.white,
    fontSize: 15,
  },
  loginButton: {
    width: 280,
    padding: 10,
    margin: 5,
    backgroundColor: stylesData.messageInputHover,
    borderRadius: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: stylesData.white,
    fontSize: 15,
  },
  activeButton: {
    width: 280,
    padding: 10,
    margin: 5,
    backgroundColor: stylesData.loginInput,
    borderRadius: 10,
    fontFamily: 'monospace',
    textAlign: 'center',
    color: stylesData.gray,
    fontSize: 15,
  },
  description: {
    color: stylesData.white,
    fontFamily: 'monospace',
    fontSize: 15,
  },
  warningLabels: {
    maxWidth: 370,
    fontFamily: 'monospace',
    fontSize: 13,
    color: stylesData.error,
  }
})
