import express from 'express'
import auth from '../middleware/auth.js'
import { Chat, ChatMessages, getChatHistory, getMessage, loginController, refreshTokenController, registerController, searchHistory } from '../Controllers/Users.js'

const userRouter = express.Router()

userRouter.post('/register',registerController)
userRouter.post('/login',loginController)
userRouter.post('/chat',auth,Chat)
userRouter.post('/chatMessage',auth,ChatMessages)
userRouter.get('/getMessage',auth,getMessage)
userRouter.get('/history',auth,getChatHistory)
userRouter.get('/searchHistory',auth,searchHistory)
userRouter.post('/refreshToken',refreshTokenController)
export default userRouter