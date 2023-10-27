import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    nowFollow:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    yourId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});
const Friends = mongoose.Schema('Friends',friendSchema);

export default Friends;