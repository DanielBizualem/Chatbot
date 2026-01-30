import ChatMessage from "../models/ChatMessage.js";

export const searchService = async(userId,query,type)=>{
    try{
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

        return {
            matches,
            contains: matches.length > 0,
            count: matches.length
        }
    }catch(error){
        throw error
    }
}