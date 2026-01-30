import ChatMessage from "../models/ChatMessage.js";


export const historyService = async(userId,page = 1, pageSize = 10)=>{
    try{
        const totalMessages = await ChatMessage.countDocuments({ user: userId });
        const history = await ChatMessage.find({ user: userId })
            .sort({ timestamp: -1 }) // Newest first
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return {
            history: history.reverse(), // Reverse to show chronological for the UI
            total_pages: Math.ceil(totalMessages / pageSize),
            current_page: page,
            total_messages: totalMessages
        };
    }catch(error){
        throw error
    }
}