import User from '../model/User.js'
import  path  from 'path';
const AVATAR_PATH= path.join('/upload/User');
import fs from 'fs';
import express from 'express'
export default class UserController{

    // for the save User
    saveUser= async (req,res)=>{
        console.log(req.file);
        const data={
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            AccountType: req.body.AccountType,
            bio: req.body.bio,
            totalLikes:req.body.totalLikes,
            totalComment:req.body.totalComment,
            totalFriends:req.body.totalFriends,
            totalPost:req.body.totalPost,
            following:req.body.following,
            follower:req.body.follower,
        }
        
        if(req.file){
            data.avtar= AVATAR_PATH + '/' + req.file.filename;
            data.path=req.file.path;
            data.profile=req.file.filename
        }

        try{
             const user= await User.create(data);
             return res.json({
                message: user
             })
        }catch(err){
            console.log("there is error with save USer",err);
            return;
        }
    }
    
    // for the Get All Data
    getAllUser= async (req,res)=>{
        try{
             const user= await User.find({});
             return res.json({
                message: user
             })
        }catch(err){
            console.log("there is error with Finding All USer",err);
            return;
        }
    }

    // for the Delete User
    deleteUser = async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.params.id);    
          return res.status(404).json({ message: "User not found" });              
       return res.json({ message: "User deleted", user });
      } catch (err) {
        console.error("Error during delete user", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
    

    

    // for the Getting Indivisual User
    getUser= async (req,res)=>{
        try{
            const user= await User.findById(req.params.id);
            return res.json({User:user})
        }catch(err){
            console.log("There is problem with Geting user",err);
            return;
        }
    }

    // for the Update User
    updateUser = async (req,res)=>{
        try{
             const user= await User.findByIdAndUpdate(req.params.id,req.body);
             return res.json({Message:"User Updated",User:user})
        }catch(err){
            console.log("There is Error while Updating User" ,err);
            return;
        }
    }
}
