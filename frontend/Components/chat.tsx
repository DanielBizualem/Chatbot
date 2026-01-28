"use client"

import { useState } from "react"
import { useEffect, useRef } from "react"

export default function Chat(){
    const [menu,setMenu] = useState(false)
    const [messages, setMessages] = useState([])

    const onClickHandler = ()=>{
        setMenu(!menu)
    }
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages])

    return(
        <div className="flex">
            {/** Left bar */}
            <div className={`
                relative min-h-screen border-r border-gray-200 bg-gray-100 text-black transition-all duration-300
                hidden sm:flex flex-col 
                ${menu ? 'w-72' : 'w-18'} 
                `}>
                <img src="/menu.png" alt="" className="absolute top-6 left-6 w-5 h-5 cursor-pointer sticky" onClick={onClickHandler}/>
            </div>
            {/** main Chat */}
            <div className="flex flex-col flex-1">
  
  

                {/** Center region */}
            <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
              <div className="w-full border-b border-gray-200 py-5 px-8 bg-white flex-none">
                Chat
              </div>
            
              <div className="flex-1 flex flex-col min-h-0 px-5">
                  {messages.length > 0 ? (
                    /* The trick: Remove justify-end. 
                      Instead, we use a flex-col container that allows the spacer to push content down.
                    */
                      <div className="flex-1 overflow-y-auto w-full max-w-md mx-auto p-4 custom-scrollbar [scrollbar-width:none]">
                      <div className="flex flex-col justify-end min-h-full">
                        <div className="space-y-4">
                          {messages.map((msg, i) => (
                            <div key={i} className="p-3 bg-gray-100 rounded-lg w-fit mr-auto">
                              {msg.text}
                            </div>
                          ))}
                          {/** 2. THE ANCHOR: This is where the focus goes */}
                          <div ref={messagesEndRef} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex justify-center items-center">
                      <h1 className="text-xl font-bold text-gray-800">💫 How can I help you today?</h1>
                    </div>
                  )}

                  {/** 2. Input Area - Bolted to the bottom */}
                  <div className="flex-none w-full max-w-md mx-auto py-4 bg-white">
                    <div className="relative flex w-full">
                      <textarea
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 outline-none resize-none shadow-sm focus:border-blue-300 transition-all"
                        placeholder="Ask here..."
                        rows={1}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); 
                            const val = e.currentTarget.value;
                            if (val.trim()) {
                              setMessages((prev) => [...prev, { text: val }]);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />
                      <img src="/send.svg" alt="" className="absolute top-3.5 right-3 w-4.5 cursor-pointer"/>
                    </div>
                  </div>
            </div>
            <div className="flex py-1 mb-1  justify-center">
              <h1 className="text-sm bg-gray-100 py-1 rounded-full px-6">Developed by Daniel Bizualem</h1>
            </div>
          </div>
</div>
        </div>
    )
}