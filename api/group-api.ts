import axios from "axios"
const api_url = 'http://192.168.1.208:4000/api'

//createGroup
const createNewGroupAPI = async(name:string, image:any, usersID:any, host:string) => {
  console.log(image)
  try{
    const result = await axios.post(`http://${host}/api/group/create`, {name, image, usersID})
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to create a new group",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

const deleteGroupChatAPI = async(chatID: string, host:string) => {
  console.log("DELETE GROUP", chatID)
  try{
    const result = await axios.get(`http://${host}/api/group/delete/${chatID}`)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to delete the chat",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

const editGroupAPI = async({_id, data}: any, host:string) => {
  try{
    const result = await axios.post(`http://${host}/api/group/edit`, {_id, ...data})
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to edit the group",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

export {createNewGroupAPI, deleteGroupChatAPI, editGroupAPI}