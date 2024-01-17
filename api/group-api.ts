import axios from "axios"
const api_url = 'http://192.168.1.194:4000/api'

//getGroups
const fetchUserGroupsAPI = async(_id:string) => {
  try{
    const result = await axios.get(`${api_url}/group/${_id}`)
    return({
      data: result.data,
      status: 200,
    })
  } catch(err: any) {
    return({
      data: [],
      title: "Not able to retreive groups",
      message: err.response?.data.message || "The server is possibly offline :<",
      status: err.response?.status || 400,
    })
  }
}

//createGroup
const createNewGroupAPI = async(name:string, image:string, usersID:any) => {
  try{
    const result = await axios.post(`${api_url}/group/create`, {name, image, usersID})
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

export {fetchUserGroupsAPI, createNewGroupAPI}