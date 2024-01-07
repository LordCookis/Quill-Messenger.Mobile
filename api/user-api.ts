import { removeItem } from "../lib/async-storage"
import axios from "axios"

const api_url = 'http://192.168.1.194:4000/api'

const account = async(userdata: any, register: boolean) => {
  const url = register ? `${api_url}/user/register` : `${api_url}/user/login`
  if(register && userdata.password !== userdata.confirmPassword){
    return {message: "Passwords do not match!", status: 400};
  }
  try{
    const result = await axios.post(url, {
      usertag: userdata.usertag,
      password: userdata.password
    })
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: null,
      title: `Couldn't ${register ? "register a new" : "log into"} account`,
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
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
      title: `Couldn't fetch users list`,
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
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
      title: `No users found with such id`,
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
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
      title: `No users found with such tag`,
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
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
      title: `Not able to update profile`,
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
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