import User from "../models/User.js"


const userDetails = async(userId)=>{
    try{
        const user = await User.findById(userId).select("-password -refresh_token")
        if(!user) throw new Error
        return user
    }catch(error){
        throw error
    }
}

export default userDetails