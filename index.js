import express from 'express'
import dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import router from './router/HomeRouter.js';
import db from './config/Db.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { pid } from 'process';
import cookieParser from 'cookie-parser';
import ejs from 'ejs'
// for the authentication
import passPortLocal from './Security/Passport-local.js';
import passPortGoogle  from './Security/passport-google.js'
import passportTwitter from './Security/passport-twitter.js'

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    dotenv.config();
    const PORT = process.env.PORT;
    const app = express();
    app.use(cookieParser())
    app.use(cors('*'))
    app.use(fileUpload({
        useTempFiles: true
    }))
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('view engine','ejs');
    app.set('views','./views')
    // use Router to handle All HTTP

    app.use(session({
        name: 'Backend',
        secret: 'socialMedia',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000 * 60 * 100)
        },
        store: new MongoStore(
            {
                mongoUrl: 'mongodb://127.0.0.1:27017/V1Backend',
                autoRemove: 'disabled'
            },
            function (err) {
                console.log(err || 'connect-mongo db setup ok');
            }
        )
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(
        function(req,res,next){
            if(req.isAuthenticated()){
                res.locals.user=req.user
            }
            next();
        }
    )
    app.use('/', router)
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT} with process ID ${pid}`)
    });
    app.on('error', (err) => {
        console.log("There is error ", err);
        return;
    })
}

