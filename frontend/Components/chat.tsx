"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import InputArea from "./inputArea"
import SearchRecent from "./searchRecent"
import Axios from "@/utils/Axios"
import summeryApi from "@/common/SummeryApi"
import fetchUserDetail from '../utils/fetchUserDetails'



export default function Chat() {
    const [menu, setMenu] = useState(false)
    const [state,setState] = useState(false)
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    
    const onClickRefresh = ()=>{
        window.location.reload()
    }
    const onClickHandler = () => {
        setMenu(!menu)
    }
    const onClickState = ()=>{
        setState(!state)
    }
    
    const userDetail = async()=>{
        const userData = await fetchUserDetail()
        setUser(userData.data)
    }
    
    useEffect(()=>{
        userDetail()
    },[])

    
    return (
        <div className="flex font-sans">
            {/** Left bar */}
            <div className={`
                relative min-h-screen border-r border-gray-200 bg-gray-100 text-black transition-all duration-300
                hidden sm:flex flex-col justify-between p-6 
                ${menu ? 'w-72' : 'w-18'}
            `}>
                <div className="flex flex-col gap-10">
                    <div className="flex gap-4 w-full justify-between">
                        <img src="/menu.png" alt="" className="w-5 h-5 cursor-pointer" onClick={onClickHandler} />
                        <img src="/search.png" alt="" className={`w-5 h-5 cursor-pointer ${menu?'':'hidden'}`} onClick={onClickState}/>
                    </div>
                    <div className="flex gap-6 items-center">
                        <img src="/edit.png" alt="" className="w-5 h-5 cursor-pointer" onClick={onClickRefresh}/>
                        <Link href={''} className={`font-semibold ${menu ? 'block' : 'hidden'} text-sm`} onClick={onClickRefresh}>New Chat</Link>
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
                        {
                            user?
                            <p>{user.username}</p>
                            :
                            <div className="flex gap-4">
                            <Link href={'/login'} className="text-gray-700 hover:text-blue-500">Login</Link>
                            <Link href={'/signUp'} className="text-gray-700 hover:text-blue-500">signUp</Link>
                        </div>
                        }
                    </div>
                    {
                        state?<SearchRecent/>:<InputArea/>
                    }
                    
                    <div className={`flex py-1 mb-1 justify-center ${state?'hidden':''}`}>
                        <h1 className="text-[13px] text-gray-500 bg-gray-100 py-1 rounded-full px-6">Developed by Daniel Bizualem</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}