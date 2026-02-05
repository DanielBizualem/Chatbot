"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Axios from "@/utils/Axios"
import summeryApi from "@/common/SummeryApi"


export default function Chat() {
    const [messages, setMessages] = useState<any[]>([])
    const [isHistoryLoading, setIsHistoryLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const getGeminiResponse = async (userPrompt: string) => {
        try {
            setLoading(true);
            
            // 1. Call your Node.js backend using your existing config
            const response = await Axios({
                ...summeryApi.chatMessage,
                data: { message: userPrompt }
            });


            const aiText = response.data.ai_response;

            // 2. Add the bot's response to the message array
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: aiText, sender: 'bot' }
            ]);

        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble thinking right now.", sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])
    
    return (
        <div className="flex-1 flex flex-col min-h-0 px-5 justify-center transition-all duration-300">
                        {messages.length > 0 ? (
                            <div className="flex-1 overflow-y-auto w-full max-w-xl mx-auto p-4 custom-scrollbar [scrollbar-width:none]">
                                <div className="flex flex-col justify-end min-h-full">
                                    <div className="space-y-4">
                                        {messages.map((msg, i) => (
                                            <div 
                                                key={i} 
                                                className={`p-3 rounded-lg w-fit max-w-[80%] ${
                                                    msg.sender === 'bot' 
                                                    ? "bg-gray-100 text-black mr-auto" 
                                                    : "bg-blue-500 text-white ml-auto"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                        ))}
                                        {loading && (
                                            <div className="p-3 bg-gray-50 text-gray-400 rounded-lg w-fit mr-auto animate-pulse">
                                                echoChat is thinking...
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                <h1 className="text-xl font-bold text-gray-800">💫 How can I help you today?</h1>
                            </div>
                        )}

                        {/** Input Area */}
                        <div className="flex-none w-full max-w-xl mx-auto py-4 bg-white">
                            <div className="relative flex w-full">
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 outline-none resize-none shadow-sm focus:border-blue-300 transition-all disabled:bg-gray-50"
                                    placeholder={loading ? "Waiting for Gemini..." : "Ask here..."}
                                    rows={1}
                                    disabled={loading}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            const val = e.currentTarget.value;
                                            if (val.trim()) {
                                                // 1. Add User message to UI
                                                setMessages((prev) => [...prev, { text: val, sender: 'user' }]);
                                                // 2. Trigger the AI response
                                                getGeminiResponse(val);
                                                // 3. Clear the input
                                                e.currentTarget.value = "";
                                            }
                                        }
                                    }}
                                />
                                <img src="/send.svg" alt="" className={`absolute top-3.5 right-3 w-4.5 ${loading ? 'opacity-20' : 'cursor-pointer'}`} />
                            </div>
                        </div>
                    </div>
    )
}