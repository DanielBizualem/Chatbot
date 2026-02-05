import { useCounterStore } from "@/app/store"

const OtherComponent = ({count}:{count:number})=>{
    const increment = useCounterStore((state)=>state.increment)
    const decrement = useCounterStore((state)=>state.decrement)
    return <div className="flex flex-col gap-3 items-center">
                {count}
                <div className="flex gap-3">
                    <button onClick={increment} className="flex px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">Increment</button>
                    <button onClick={decrement} className="flex px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white">Decrement</button>
                </div>
            </div>
}

export default OtherComponent