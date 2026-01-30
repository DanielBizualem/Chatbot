"use client"

import Link from "next/link"
import { useState } from "react"
import Axios from '../../utils/Axios.js'
import summeryApi from "@/common/SummeryApi.js"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    const [state,setState] = useState({
        email:"",
        password:""
    })

    const onChangeHandler = async(e)=>{
        const name = e.target.name
        const value = e.target.value
        setState(prev=>({...prev,[name]:value}))
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try{
        const response = await Axios({
            ...summeryApi.login,
            data:state
        })
        
        if(response.data.success){
            localStorage.setItem('accessToken',response.data.data.accessToken)
            localStorage.setItem('refreshToken',response.data.data.refreshToken)
            router.push("/")
            router.refresh()
            console.log('login successfully')
        }

        }catch(error){
            console.log("Error")
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen w-full font-sans">
            <div className="flex flex-col flex-1 max-w-md min-w-0 border border-gray-300 rounded px-7 py-4 items-center gap-6 mx-3">
                <h1 className="flex text-lg">Login</h1>
                <form className="flex flex-col gap-5 w-full" onSubmit={onSubmitHandler}>
                    <div className="relative flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="text" name="email" value={state.email} className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Email" onChange={onChangeHandler}/>
                        <img src="/email.png" alt="" className="w-5 h-5 absolute top-2 right-5"/>
                    </div>
                    <div className="relative flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="password" name="password" value={state.password} className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Password" onChange={onChangeHandler}/>
                        <img src="/padlock.png" alt="" className="w-5 h-5 absolute top-2 right-5"/>
                    </div>
                    <button className="bg-blue-500 text-white border px-4 py-1.5 rounded self-start cursor-pointer">Login</button>
                </form>
                <Link href='/signUp' className="text-sm text-gray-700 hover:text-blue-500">Create new Account</Link>
            </div>
        </div>
    )
}