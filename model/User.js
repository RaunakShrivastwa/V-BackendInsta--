import mongoose from "mongoose";
import PasswordEncrypt from "../config/PasswordEncrypt.js";
const config = new PasswordEncrypt();
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
    totalPost: {
        type: String
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    follower: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    memory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Memory'
        }
    ],
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    publicId: {
        type: String
    },
    secure_url: {
        type: String
    }

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;