"use client"
import OtherComponent from "@/Components/OtherComponent"
import { useCounterStore } from "../store"

export default function Home(){
    const count = useCounterStore((state)=>state.count)
    return <OtherComponent count={count}/>
}

