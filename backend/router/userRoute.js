import express from 'express'
import auth from '../middleware/auth.js'
import { ChatMessages, avatarController, getChatHistory, loginController, refreshTokenController, registerController, searchHistory, userDetail } from '../Controllers/Users.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()

userRouter.post('/register',registerController)
userRouter.post('/login',loginController)
userRouter.post('/chatMessage',auth,ChatMessages)
userRouter.get('/history',auth,getChatHistory)
userRouter.get('/searchHistory',auth,searchHistory)
userRouter.post('/refreshToken',refreshTokenController)
userRouter.post('/uploadAvatar',auth,upload.single('image'),avatarController)
userRouter.get('/userDetail',auth,userDetail)
export default userRouter