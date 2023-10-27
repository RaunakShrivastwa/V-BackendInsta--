import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/V1Backend');
 const db = mongoose.connection;

 db.on('error',()=>{
    console.log("There is Error with connecting DB",err);
    return;
 });

 db.on('open',()=>{
    console.log("Successfully Connected to Db ");
 });

export default db;