import { GoogleGenerativeAI } from "@google/generative-ai"
import ChatMessage from '../models/ChatMessage.js'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const chat = async(message,userId)=>{
    if (!message) throw new Error("Message is required!");
    try {
        // 1. Fetch History from MongoDB
        const history = await ChatMessage.find({ user: userId })
            .sort({ timestamp: -1 })
            .limit(5);

        // 2. Format history for Gemini (Role: "user" and "model")
        // Note: Gemini uses 'parts' with 'text'
        const chatHistory = history.reverse().flatMap(chat => [
            { role: "user", parts: [{ text: chat.user_message }] },
            { role: "model", parts: [{ text: chat.ai_response }] }
        ]);

        // 3. Initialize Model with System Instruction
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", // or "gemini-1.5-pro"
            systemInstruction: "You are a helpful context-aware assistant." 
        });

        // 4. Start Chat session with history
        const chatSession = model.startChat({
            history: chatHistory,
        });

        // 5. Send message and get response
        const result = await chatSession.sendMessage(message);
        const aiResponse = result.response.text();

        // 6. Save to Database
        const newMessage = await ChatMessage.create({
            user: userId,
            user_message: message,
            ai_response: aiResponse
        });

        return {
            user_message: message,
            ai_response: aiResponse,
            timestamp: newMessage.timestamp,
            historyCount: history.length
        };

    }catch(error){
        throw error
    }
}

