import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import userRouter from './router/userRoute.js'

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())
app.use(cookieParser())


const getAIResponse = async (userMessage) => {
    return `AI says: ${userMessage}! How can I help?`;
};

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === "") {
        return res.status(400).json({
            error: "Message is required and cannot be empty."
        });
    }

    try {
        // 2. Get the AI Response (Mock)
        const aiResponse = await getAIResponse(message);

        // 3. Successful Response
        return res.status(200).json({
            user_message: message,
            ai_response: aiResponse,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Chat Error:", error);
        return res.status(500).json({ error: "Something went wrong on our end." });
    }
});

connectDB()

app.use('/api/chatbot',userRouter)

app.listen(PORT,()=>{console.log(`The server is running on http://localhost:${PORT}`)})