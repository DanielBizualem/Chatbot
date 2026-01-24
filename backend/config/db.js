import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGOOSE_URL).then(()=>console.log('DB Connected'))
}