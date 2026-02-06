"use client"
import Axios from "@/utils/Axios.js";
import summeryApi from "@/common/SummeryApi.js";
import { useEffect, useState } from "react";


export default function Recent(){
    const [messages, setMessages] = useState<any[]>([])
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    const getChatHistory = async () => {
        if (messages.length > 0) return;

        try {
            setIsHistoryLoading(true);
            const response = await Axios({ ...summeryApi.chatHistory });

            if (response.data.success) {
                const rawHistory = response.data.message || [];

                // Use flatMap to separate the User message and AI response 
                // into their own individual chat bubbles
                const formatted = rawHistory.flatMap((chat: any) => [
                    { text1: chat.user_message, sender: 'user' },
                    { text2: chat.ai_response, sender: 'bot' }
                ]);

                setMessages(formatted);
            }
        } catch (error) {
            console.error("Error loading chat history:", error);
        } finally {
            setIsHistoryLoading(false);
        }
    };

    useEffect(() => {
        getChatHistory();
    }, []);
    return (
        <div className="flex flex-col w-full gap-1 h-[350px] overflow-y-auto custom-scrollbar [scrollbar-width:none]"> 
            {messages
                .filter(item => item.text1)
                .map((items, index) => (
                    <div key={index} className="w-full">
                        <p 
                            className="block truncate w-full rounded-full hover:bg-gray-200 px-3 py-2 text-sm text-gray-700 cursor-pointer transition-colors"
                            title={items.text1}
                        >
                            {items.text1}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}