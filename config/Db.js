import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect('mongodb+srv://ASJ:abhi@cluster0.a1i0vnk.mongodb.net/LetsWork');
const db = mongoose.connection;

db.on('error', (err) => {
   console.log("There is Error with connecting DB", err);
   return;
});

db.on('open', () => {
   console.log("Successfully Connected to Db ");
});

export default db;