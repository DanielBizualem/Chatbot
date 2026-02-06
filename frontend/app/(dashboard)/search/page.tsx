"use client"
import { useState, useEffect } from "react"
import Axios from "@/utils/Axios";
import summeryApi from "@/common/SummeryApi";
import Link from "next/link";

export default function SearchRecent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...summeryApi.searchResult,
                params: { query: query } // This sends ?query=Ethiopia
            });

            if (response.data.success) {
                setSearchResults(response.data.data);
            }
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce Logic: Wait 500ms after user stops typing to call the API
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchTerm);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="flex w-full justify-center mt-10 p-4">
            <div className="flex flex-col w-full max-w-2xl gap-4">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold font-sans">Search</p>
                    <Link href="/chat"><img src="/back.png" alt="" className="w-6 h-6"/></Link>
                </div>
                <div className="flex relative">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex flex-1 px-10 py-2 rounded-full border border-gray-400 outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition-all" 
                        placeholder="Search for chats..."
                    />
                    <img src="/search.png" alt="search" className="w-5 h-5 absolute top-3 left-3 opacity-50"/>
                </div>

                <div className="mt-4">
                    <p className="font-semibold mb-2">{searchTerm ? "Search Results" : "Recent"}</p>
                    
                    {loading && <p className="text-sm text-gray-400 animate-pulse">Searching...</p>}

                    <div className="flex flex-col gap-2">
                        {searchResults.length > 0 ? (
                            searchResults.map((chat: any) => (
                                <div key={chat._id} className="p-4 border border-gray-100 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {chat.user_message}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate mt-1">
                                        {chat.ai_response}
                                    </p>
                                </div>
                            ))
                        ) : (
                            !loading && searchTerm && <p className="text-sm text-gray-400 italic">No history found for "{searchTerm}"</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}