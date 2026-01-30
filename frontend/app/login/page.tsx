export default function Login(){
    return(
        <div className="flex justify-center items-center min-h-screen w-full font-sans">
            <div className="flex flex-col flex-1 max-w-md min-w-0 border border-gray-300 rounded px-7 py-4 items-center gap-6 mx-3">
                <h1 className="flex text-lg">Login</h1>
                <div className="flex flex-col gap-5 w-full">
                    <div className="relative flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="text" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Email"/>
                        <img src="/email.png" alt="" className="w-5 h-5 absolute top-2 right-5"/>
                    </div>
                    <div className="relative flex flex-1 flex-col gap-1 w-full min-w-0 text-gray-600">
                        <input type="password" className="flex flex-1 min-w-0 max-w-sm border border-gray-200 rounded py-2 px-2 outline-none bg-gray-100 focus:bg-white focus:border-blue-300" placeholder="Password"/>
                        <img src="/padlock.png" alt="" className="w-5 h-5 absolute top-2 right-5"/>
                    </div>
                    <button className="bg-blue-500 text-white border px-4 py-1.5 rounded self-start cursor-pointer">Login</button>
                </div>
            </div>
        </div>
    )
}