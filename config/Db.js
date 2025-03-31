import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect('mongodb+srv://canTech:220831@cantechnology.v9rfpa6.mongodb.net/Can');
const db = mongoose.connection;

db.on('error', (err) => {
   console.log("There is Error with connecting DB", err);
   return;
});

db.on('open', () => {
   console.log("Successfully Connected to Db ");
});

export default db;