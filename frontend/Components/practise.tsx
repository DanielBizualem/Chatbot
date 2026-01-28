"use client"
import { useEffect, useRef, useState } from "react"

export default function Practise(){
    const [message,setMessages] = useState([])
    const messageToRead = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        messageToRead.current?.scrollIntoView({behavior:"smooth"})
    },[message])

    return (
        <div>
            
        </div>
    )
}