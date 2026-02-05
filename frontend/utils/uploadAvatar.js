import Axios from "./Axios.js";
import summeryApi from "../common/SummeryApi.js";

const uploadAvatar = async(image)=>{
    try{
        const formData = new FormData()
        formData.append("avatar",image)

        const response = await Axios({
            ...summeryApi.avatar,
            data:formData
        })

        return response
    }catch(error){
        console.log(error)
    }
}

export default uploadAvatar