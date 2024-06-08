import axios from "axios"
const api_url = 'http://192.168.1.208:4000/api'

//getGroups
//const fetchUserGroupsAPI = async(_id:string, host:string) => {
//  try{
//    const result = await axios.get(`http://${'26.38.55.97:4000'}/api/group/${_id}`)
//    return({
//      data: result.data,
//      status: 200,
//    })
//  } catch(err: any) {
//    return({
//      data: [],
//      title: "Not able to retreive groups",
//      message: err.response?.data.message || "The server is possibly offline :<",
//      status: err.response?.status || 400,
//    })
//  }
//}

//createGroup
const createNewGroupAPI = async(name:string, image:any, usersID:any, host:string) => {
  console.log(image)
  try{
    const result = await axios.post(`http://${'26.38.55.97:4000'}/api/group/create`, {name, image, usersID})
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

export {createNewGroupAPI}