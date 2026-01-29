import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    user_message: { type: String, required: true },
    ai_response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ChatMessage', chatMessageSchema);