import jwt from 'jsonwebtoken'

const generateAccessToken = async(userId)=>{
    const token = await jwt.sign({id:userId},process.env.SECRET_ACCESS_TOKEN,{expiresIn:'1m'})
    return token
}

export default generateAccessToken