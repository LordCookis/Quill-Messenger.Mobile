import axios from "axios"
const api_url = 'http://192.168.1.208:4000/api'

const fetchChatMessages = async(chatID: string) => {
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

// fetchLatestMessage
const fetchLatestMessageAPI = async(chatID: string) => {
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

// sendMessage
const sendMessageAPI = async(chatID: string, senderID: string, type: any, text: any) => {
  try{
    const result = await axios.post(`${api_url}/message/send`, {chatID, senderID, type, text})
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

export {fetchChatMessages, fetchLatestMessageAPI, sendMessageAPI}