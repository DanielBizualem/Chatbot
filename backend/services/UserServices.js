import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import jwt from 'jsonwebtoken'

export const createUser = async (username, email, password,avatar) => {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // 2. Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 3. Save to DB
    const newUser = new User({ username, email,avatar, password: hashedPassword });
    await newUser.save();

    return newUser;
};

export const login = async(email,password)=>{
   try{
        const user = await User.findOne({email})
        if (!user) throw new Error("User not registered!")

        const comparePassword = await bcryptjs.compare(password,user.password)
        if(!comparePassword) throw new Error("Check you password")
            
        const accessToken =  await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        if (!accessToken || !refreshToken) throw new Error('Token not available')

        const updateUser = await User.findByIdAndUpdate(user?._id,{
            last_login_date: new Date()
        })

        const userWithPosts = await User.findById(user._id)

        return {
            user: userWithPosts,
            accessToken,
            refreshToken
          };

   }catch(error){
        throw error
   }
}

export const logout = async(userId)=>{

    const updateUser = await User.findByIdAndUpdate(userId,{
        refresh_token:""
    })
    return updateUser
}

export const refreshAccessTokenService = async (refreshToken) => {
    if (!refreshToken) throw new Error("No Refresh Token provided");
    const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    const user = await User.findById(decoded.id);
    
    if (!user || user.refresh_token !== refreshToken) {
        throw new Error("Invalid Refresh Token");
    }

    const newAccessToken = await generateAccessToken(user._id);
    
    return { accessToken: newAccessToken };
};

