"use client"

import { useState } from "react"

export default function Chat(){
    const [menu,setMenu] = useState(false)
    const [messages, setMessages] = useState([])

    const onClickHandler = ()=>{
        setMenu(!menu)
    }

    return(
        <div className="flex">
            {/** Left bar */}
            <div className={`
                relative min-h-screen border-r border-gray-200 bg-gray-100 text-black transition-all duration-300
                hidden sm:flex flex-col 
                ${menu ? 'w-72' : 'w-18'} 
                `}>
                <img src="/menu.png" alt="" className="absolute top-6 left-6 w-5 h-5 cursor-pointer" onClick={onClickHandler}/>
            </div>
            {/** main Chat */}
            <div className="flex flex-col flex-1">
  {/** top nav */}
  <div className="w-full border-b border-gray-200 sticky top-0 py-5 px-8 bg-white flex-none">
    Chat
  </div>

  {/** Center region */}
  <div className="flex-1 flex flex-col gap-3 justify-center items-center w-full px-5">
    {/** * FIX: We wrap the input in a relative container. 
      * This container dictates the 100% width or max-width.
      */}
      {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className="p-3 bg-gray-100 rounded-lg max-w-md">
                {msg.text}
              </div>
            ))}
          </div>
        )}
        {messages.length === 0 && (
              <h1 className="text-xl font-bold text-gray-800">💫 How can I help you today?</h1>
            )}
      
    <div className="relative flex w-full max-w-md px-4"> 
      <textarea
        className="absolute top-0 left-0 w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none shadow-sm [&::-webkit-scrollbar]:display-none [scrollbar-width:none]"
        placeholder="Ask here..."
        onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              setMessages([{ text: e.target.value }]); // Push first message
              e.target.value = "";
            }
          }}
      />
      <img src="/send.svg" alt="" className="absolute top-5 w-6 right-3"/>
    </div>
  </div>
</div>
        </div>
    )
}