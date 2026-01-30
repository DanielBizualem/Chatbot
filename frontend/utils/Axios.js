import axios from "axios"
import { baseURL } from "../common/SummeryApi"

const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true
})

const refreshAccessToken = async(refreshToken)=>{
    try{
        const response = await Axios({
            ...summeryApi.refreshToken,
            headers:{
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem(accessToken)
        return accessToken
    }catch(error){
        console.log(refreshToken)
    }
}

export default Axios