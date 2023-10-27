import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    AccountType: {
        type: String,
    },
    avtar: {
        type: String
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    bio: {
        type: String
    },
    totalLikes: {
        type: String
    },
    totalComment: {
        type: String
    },
    totalFriends: {
        type: String
    },
    totalPost:{
        type:String
    },
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    follower:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    memory:[
        {
            type: String
        }
    ],
    path:{
        type : String
    },
    profile:{
        type: String
    }
    
},{timestamps:true});

const User = mongoose.model("User",UserSchema);
export default User;