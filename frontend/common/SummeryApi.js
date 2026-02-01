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
    
}

export default summeryApi