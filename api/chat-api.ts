import axios from "axios"

const api_url = 'http://192.168.1.194:4000/api'

const getChats = async(_id: string) => {
  try{
    const result = await axios.get(`${api_url}/chat/${_id}`)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to retreive chats",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

const createChat = async(firstID: string, secondID: string) => {
  try{
    const result = await axios.post(`${api_url}/chat/create`, {firstID, secondID})
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to create a new chat",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

const fetchMessages = async(chatID: string) => {
  try{
    const result = await axios.get(`${api_url}/message/${chatID}`)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to fetch messages",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

const fetchLatestMessage = async(chatID: string) => {
  try{
    const result = await axios.get(`${api_url}/message/findLatest/${chatID}`)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to fetch messages",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

const sendTextMessage = async(chatID: string, senderID: string, text: string) => {
  try{
    const result = await axios.post(`${api_url}/message/send`, {chatID, senderID, text})
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to send a message",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

export {getChats, createChat, fetchMessages, sendTextMessage, fetchLatestMessage}