import Link from "next/link"
export default function signUp(){
    return(
        <div className="flex justify-center items-center min-h-screen w-full font-sans">
            <div className="flex flex-col flex-1 max-w-md min-w-0 border border-gray-300 rounded px-7 py-4 items-center gap-6 mx-3 shadow-sm">
                <h1 className="flex text-lg">signUp</h1>
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="text" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Username"/>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="text" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Email"/>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="password" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Password"/>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="password" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Confirm Password"/>
                    </div>
                    <button className="bg-blue-500 text-white border px-4 py-1.5 rounded self-start cursor-pointer">signUp</button>
                </div>
                <Link href='/login' className="text-sm text-gray-700 hover:text-blue-500">Back to login</Link>
            </div>
        </div>
    )
}