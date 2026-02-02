import User from "../models/User.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateAccessToken from "../utils/generateAccessToken.js"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import ChatMessage from '../models/ChatMessage.js';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { createUser,login, refreshAccessTokenService } from "../services/UserServices.js"
import { chat } from "../services/chatService.js";
import { historyService } from "../services/history.js";
import { searchService } from "../services/search.js";
import userDetails from "../services/userDetail.js";

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
    try{
        const { message } = req.body;
        const userId = req.user.id;

        if (!message) {
            return res.status(400).json({ 
                success: false, 
                error: "Message is required." 
            });
        }

        const chatData = await chat(message,userId)

        if (!chatData) {
            throw new Error("Service failed to return chat data");
        }

        const contextSummary = chatData.historyCount > 0 
                ? `Continuing conversation with ${chatData.historyCount} previous messages.` 
                : "Starting a new conversation.";

            return res.status(200).json({
                success: true,
                user_message: chatData.user_message,
                ai_response: chatData.ai_response,
                timestamp: chatData.timestamp,
                context_summary: contextSummary
            });
    }catch(error){
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
    
};

const getChatHistory = async(req,res)=>{
    try {
        const userId = req.user.id;

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.page_size) || 10

        const historyMessage = await historyService(userId,page,pageSize)

        if(!historyMessage){
            throw new Error("I can't get your chat history")
        }
        return res.status(200).json({
            success:true,
            message:historyMessage.history,
            totalPage:historyMessage.total_pages,
            currentPage: historyMessage.current_page,
            totalMessage: historyMessage.total_messages
        })
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
        const searchResult = await searchService(userId,query,type)
        
        res.json({
            Matches:searchResult.matches,
            Contains:searchResult.contains,
            Count:searchResult.count
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

const userDetail = async(req,res)=>{
    try{
        const userId = req.user.id
        const result = await userDetails(userId)
        return res.json({
            success:true,
            data:result
        })
    }catch(error){
        return res.json(error.message)
    }
}

export {registerController,userDetail,loginController,ChatMessages,getChatHistory,searchHistory,refreshTokenController}