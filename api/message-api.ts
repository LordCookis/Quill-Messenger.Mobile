import axios from "axios"
const api_url = 'http://192.168.1.208:4000/api'

const fetchChatMessages = async(chatID:string, host:string) => {
  try{
    const result = await axios.get(`http://${'26.38.55.97:4000'}/api/message/${chatID}`)
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
const fetchLatestMessageAPI = async(chatID:string, host:string) => {
  try{
    const result = await axios.get(`http://${'26.38.55.97:4000'}/api/message/findLatest/${chatID}`)
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
const sendMessageAPI = async(chatID:string, senderID:string, type:any, text:any, host:string) => {
  console.log({chatID, senderID, type, text})
  try{
    const result = await axios.post(`http://${'26.38.55.97:4000'}/api/message/send`, {chatID, senderID, type, text})
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

const removeMessageAPI = async({_id} : {_id: string}) => {
  try{
    const result = await axios.get(`http://${'26.38.55.97:4000'}/api/message/remove/${_id}`)
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

export {fetchChatMessages, fetchLatestMessageAPI, sendMessageAPI, removeMessageAPI}