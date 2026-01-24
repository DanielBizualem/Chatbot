import express from 'express'
import auth from '../middleware/auth.js'
import { Chat, ChatMessages, getChatHistory, getMessage, login, register, searchHistory } from '../Controllers/Users.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/chat',auth,Chat)
userRouter.post('/chatMessage',auth,ChatMessages)
userRouter.get('/getMessage',auth,getMessage)
userRouter.get('/history',auth,getChatHistory)
userRouter.get('/searchHistory',auth,searchHistory)
export default userRouter