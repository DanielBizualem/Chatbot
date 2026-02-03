import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    avatar:{type:String,default:null},
    password: { type: String, required: true },
    refresh_token:{type:String,default:null},
    email: { type: String }
});

export default mongoose.model('User', userSchema);