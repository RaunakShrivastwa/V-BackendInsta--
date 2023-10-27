import express from 'express'
import dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import router from './router/HomeRouter.js';
import db from './config/Db.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    dotenv.config();
    const PORT = process.env.PORT;
    const app = express();
     app.use(cors('*'))
     app.use(fileUpload({
        useTempFiles:true
     }))
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // use Router to handle All HTTP
    app.use('/', router)
    app.listen(PORT, () => {
        console.log('Server is Running at Port', PORT)
    });
    app.on('error', (err) => {
        console.log("There is error ", err);
        return;
    })
}

