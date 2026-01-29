import User from "../models/User.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateAccessToken from "../utils/generateAccessToken.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import ChatMessage from '../models/ChatMessage.js';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { createUser,login, refreshAccessTokenService } from "../services/UserServices.js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    // Simple Validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = await createUser(username, email, password);
        return res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email||!password){
            return res.json({
                success:false,
                message:"Provide email and password"
            })
        }

        const result = await login(email,password)

        const cookieOptions = {
            httpOnly:true,
            secure:true,
            sameSite:"None",
        }

        res.cookie("accessToken",result.accessToken,cookieOptions)
        res.cookie("refreshToken",result.refreshToken,cookieOptions)

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            user: result.user,
            data: {
              accessToken: result.accessToken,
              refreshToken: result.refreshToken
            }
          });
          
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const ChatMessages = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) return res.status(400).json({ error: "Message is required." });

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

        // Optional: Create a quick summary for the response
        const contextSummary = history.length > 0 
            ? `Continuing conversation with ${history.length} previous messages.` 
            : "Starting a new conversation.";

        res.json({
            user_message: message,
            ai_response: aiResponse,
            timestamp: newMessage.timestamp,
            context_summary: contextSummary
        });

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const getChatHistory = async(req,res)=>{
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10;

        const totalMessages = await ChatMessage.countDocuments({ user: userId });
        const history = await ChatMessage.find({ user: userId })
            .sort({ timestamp: -1 }) // Newest first
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.json({
            history: history.reverse(), // Reverse to show chronological for the UI
            total_pages: Math.ceil(totalMessages / pageSize),
            current_page: page,
            total_messages: totalMessages
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const searchHistory = async(req,res)=>{
    try {
        const userId = req.user.id;
        const { query, type } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required." });
        }

        // Build a flexible search filter
        let searchFilter = { user: userId };
        const regex = new RegExp(query, 'i'); // 'i' means case-insensitive

        if (type === 'user') {
            searchFilter.user_message = regex;
        } else if (type === 'ai') {
            searchFilter.ai_response = regex;
        } else {
            // Default: Search both fields
            searchFilter.$or = [
                { user_message: regex },
                { ai_response: regex }
            ];
        }

        const matches = await ChatMessage.find(searchFilter).sort({ timestamp: -1 });

        res.json({
            matches,
            contains: matches.length > 0,
            count: matches.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const result = await refreshAccessTokenService(refreshToken);
        

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(200).json({
            success: true,
            accessToken: result.accessToken
        });
    } catch (error) {
        return res.status(401).json(error.message);
    }
};

export {registerController,loginController,ChatMessages,getChatHistory,searchHistory,refreshTokenController}