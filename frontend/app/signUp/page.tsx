"use client"

import Link from "next/link"
import Axios from "@/utils/Axios"
import summeryApi from "@/common/SummeryApi"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function signUp(){

    const [state,setState] = useState({
        username:"",
        email:"",
        password:""
    })

    const router = useRouter()

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setState(prev=>({...prev,[name]:value}))
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        try{
            const response = await Axios({
                ...summeryApi.register,
                data:state
            })
            if(response.data.success){
                setState({
                    username:"",
                    email:"",
                    password:"",
                })
                router.refresh()
                console.log('registered successfully')
            }
        }catch(error){
            throw error
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen w-full font-sans">
            <div className="flex flex-col flex-1 max-w-md min-w-0 border border-gray-300 rounded px-7 py-4 items-center gap-6 mx-3 shadow-sm">
                <h1 className="flex text-lg">signUp</h1>
                <form className="flex flex-col gap-5 w-full" onSubmit={onSubmitHandler}>
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="text" name="username" value={state.username} className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Username" onChange={onChangeHandler}/>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="text" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" name="email" value={state.email} placeholder="Email" onChange={onChangeHandler}/>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="password" name="password" value={state.password} className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Password" onChange={onChangeHandler}/>
                    </div>
                    
                    <button className="bg-blue-500 text-white border px-4 py-1.5 rounded self-start cursor-pointer">signUp</button>
                </form>
                <Link href='/login' className="text-sm text-gray-700 hover:text-blue-500">Back to login</Link>
            </div>
        </div>
    )
}