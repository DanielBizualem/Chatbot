import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { connectDB } from './config/db.js'

const app = express()
const PORT = 4000

app.use(cors())
app.use(cookieParser())

connectDB()

app.listen(PORT,()=>{console.log(`The server is running on http://localhost:${PORT}`)})