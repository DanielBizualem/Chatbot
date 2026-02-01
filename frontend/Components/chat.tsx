"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Axios from "@/utils/Axios" // Assuming your Axios instance is here
import summeryApi from "@/common/SummeryApi"

export default function Chat() {
    const [menu, setMenu] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    // Function to fetch AI response
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

    const onClickHandler = () => {
        setMenu(!menu)
    }

    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <div className="flex font-sans">
            {/** Left bar */}
            <div className={`
                relative min-h-screen border-r border-gray-200 bg-gray-100 text-black transition-all duration-300
                hidden sm:flex flex-col justify-between p-6 
                ${menu ? 'w-72' : 'w-18'} 
            `}>
                <div className="flex flex-col gap-10">
                    <img src="/menu.png" alt="" className="w-5 h-5 cursor-pointer" onClick={onClickHandler} />
                    <div className="flex gap-6 items-center">
                        <img src="/edit.png" alt="" className="w-5 h-5 cursor-pointer" />
                        <Link href={''} className={`font-semibold ${menu ? 'block' : 'hidden'} text-sm`}>New Chat</Link>
                    </div>
                    <div className={`${menu ? 'block' : 'hidden'}`}>
                        <p>Chats</p>
                    </div>
                </div>
                <div className="flex gap-6 items-center">
                    <img src="/setting.png" alt="" className="w-5 h-5 cursor-pointer" />
                    <p className={`${menu ? 'block' : 'hidden'}`}>Setting</p>
                </div>
            </div>

            {/** main Chat */}
            <div className="flex flex-col flex-1">
                <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
                    <div className="flex w-full border-b border-gray-200 py-5 px-8 bg-white flex-none justify-between items-center">
                        <div>
                            <p className="font-semibold">echoChat</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href={'/login'} className="text-gray-700 hover:text-blue-500">Login</Link>
                            <Link href={'/signUp'} className="text-gray-700 hover:text-blue-500">signUp</Link>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 px-5 justify-center transition-all duration-300">
                        {messages.length > 0 ? (
                            <div className="flex-1 overflow-y-auto w-full max-w-md mx-auto p-4 custom-scrollbar [scrollbar-width:none]">
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
                        <div className="flex-none w-full max-w-md mx-auto py-4 bg-white">
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
                    <div className="flex py-1 mb-1 justify-center">
                        <h1 className="text-[10px] bg-gray-100 py-1 rounded-full px-6">Developed by Daniel Bizualem</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}