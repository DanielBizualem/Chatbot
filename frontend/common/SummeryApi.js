export const baseURL = "http://localhost:4000"

const summeryApi = {
    register:{
        url:'/api/chatbot/register',
        method:"post"
    },
    login:{
        url:'api/chatbot/login',
        method:"post"
    },
    forgot_password:{
        url:"api/chatbot/forgot-password",
        method:"put"
    },
    forgot_password_otp_verification:{
        url:"api/chatbot/verify-otp",
        method:"put"
    },
    resetPassword:{
        url:"/api/chatbot/resetPassword",
        method:'put'
    },
    refreshToken:{
        url:"/api/chatbot/refreshToken",
        method:"post"
    },
   
    logout:{
        url:"api/chatbot/logout",
        method:"get"
    },
    updateUser:{
        url:"api/todo/updateUser",
        method:"put"
    },
}

export default summeryApi