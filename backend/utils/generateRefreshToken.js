import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/User.js'

const generateRefreshToken = async(userId)=>{
    const token =  await jwt.sign({id:userId},process.env.SECRET_REFRESH_TOKEN,{expiresIn:'7d'})
    const updateToken = await User.findByIdAndUpdate({_id:userId},{
        refresh_token:token
    })
    return token
}

export default generateRefreshToken