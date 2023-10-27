import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    img: String
});

const Memory = mongoose.model('Memory',memorySchema)

export default Memory;