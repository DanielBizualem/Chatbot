import express from 'express'
import auth from '../middleware/auth.js'
import { ChatMessages, getChatHistory, loginController, refreshTokenController, registerController, searchHistory, userDetail } from '../Controllers/Users.js'

const userRouter = express.Router()

userRouter.post('/register',registerController)
userRouter.post('/login',loginController)
userRouter.post('/chatMessage',auth,ChatMessages)
userRouter.get('/history',auth,getChatHistory)
userRouter.get('/searchHistory',auth,searchHistory)
userRouter.post('/refreshToken',refreshTokenController)
userRouter.get('/userDetail',auth,userDetail)
export default userRouter