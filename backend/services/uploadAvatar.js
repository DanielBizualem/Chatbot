import User from "../models/User.js"
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"


const uploadAvatar = async(userId,image)=>{
   try{
        const upload = await uploadImageCloudinary(image)
        const uploadImage = await User.findByIdAndUpdate(userId,{
            avatar:upload.url
        },{new:true}).lean()

        return {
            data:uploadImage
        }
   }catch(error){
    throw error
   }
}

export default uploadAvatar