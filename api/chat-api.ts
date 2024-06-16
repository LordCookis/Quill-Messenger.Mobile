import axios from "axios"
const api_url = 'http://192.168.1.208:4000/api'

//getChats
const fetchUserChatsAPI = async(_id:string, host:string) => {
  try{
    const result = await axios.get(`http://${host}/api/chat/${_id}`)
    const resultgroups = await axios.get(`http://${host}/api/group/${_id}`)
    return({
      data: [...result.data.chats, ...resultgroups.data.groups],
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

//createChat
const createNewChatAPI = async(firstID:string, secondID:string, host:string) => {
  try{
    const result = await axios.post(`http://${host}/api/chat/create`, {firstID, secondID})
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

const deleteChatAPI = async(chatID: string, host:string) => {
  try{
    const result = await axios.get(`http://${host}/api/chat/delete/${chatID}`)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Не удалось удалить чат",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}


export {fetchUserChatsAPI, createNewChatAPI, deleteChatAPI}