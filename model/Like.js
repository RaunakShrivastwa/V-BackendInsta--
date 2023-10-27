import mongoose from "mongoose";
const LikeSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likeble:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel:{
        type: String,
        required: true,
        enum: ['Post','Comment']
    }
},{timestamps:true});

const Like = mongoose.model('Like',LikeSchema);

export default Like;