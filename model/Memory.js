import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    img: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Memory = mongoose.model('Memory', memorySchema)

export default Memory;