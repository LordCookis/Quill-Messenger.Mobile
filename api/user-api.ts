import { removeItem } from "../lib/async-storage"
import axios from "axios"

const api_url = 'http://localhost:4000/api'

const account = async(userdata: any, register: boolean) => {
  const url = register ? `${api_url}/user/register` : `${api_url}/user/login`
  if(register && userdata.password !== userdata.confirmPassword){
    return {message: "Passwords do not match!", status: 400};
  }
  console.log(url)
  try{
    const result = await axios.post(url, {
      usertag: userdata.usertag,
      password: userdata.password
    })
    console.log(`action: ${url}`, result.data)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: null,
      message: err.response.data.message,
      status: err.response.status,
    })
  }
}

const getUsers = async() => {
  try{
    const result = await axios.get(`${api_url}/user/getall`)
    return({
      data: result.data,
      status: 200
    })
  } catch (err: any) {
    return({
      data: null,
      message: err.response.data.message,
      status: err.response.status,
    })
  }
}

const fetchUserId = async(_id: string) => {
  try{
    const result = await axios.get(`${api_url}/user/find/${_id}`)
    return({
      data: result.data,
      status: 200
    })
  } catch (err: any) {
    return({
      data: null,
      message: err.response.data.message,
      status: err.response.status,
    })
  }
}

const fetchUserTag = async(usertag: string) => {
  try{
    const result = await axios.get(`${api_url}/user/findtag/${usertag}`)
    return({
      data: result.data,
      status: 200
    })
  } catch (err: any) {
    return({
      data: null,
      message: err.response.data.message,
      status: err.response.status,
    })
  }
}

const updateProfile = async(data: any) => {
  try{
    const result = await axios.post(`${api_url}/user/update`, data)
    return({
      data: result.data,
      status: 200
    })
  } catch (err: any) {
    return({
      data: null,
      message: err.response.data.message,
      status: err.response.status,
    })
  }
}

const logout = async() => {
  try{
    removeItem('userdata')
  } catch (err) { 
    console.log("error")
  }
}

export {account, logout, getUsers, fetchUserId, fetchUserTag, updateProfile}