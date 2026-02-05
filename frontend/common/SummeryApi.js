export const baseURL = "http://localhost:4000"

const summeryApi = {
    register:{
        url:'/api/chatbot/register',
        method:"post"
    },
    login:{
        url:'/api/chatbot/login',
        method:"post"
    },
    chatMessage: {
        url: '/api/chatbot/chatMessage',
        method: "post"
    },
    searchResult:{
        url: '/api/chatbot/searchHistory',
        method:"get"
    },
    history:{
        url: '/api/chatbot/history',
        method:"get"
    },
    userDetail:{
        url:'api/chatbot/userDetail',
        method:"get"
    },
    avatar:{
        url:'api/chatbot/uploadAvatar',
        method:"post"
    }
    
}

export default summeryApi