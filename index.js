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
import passPortGoogle from './Security/passport-google.js'
import passportTwitter from './Security/passport-twitter.js'
import passportFacebook from './Security/passport-facebook.js'
import http from 'http';
import { Server } from 'socket.io';
import { Socket } from 'engine.io';
import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage('./scratch');
if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    dotenv.config();
    const PORT = process.env.PORT;
    const app = express();
    const server = http.createServer(app);
    app.use(cookieParser())
    app.use(cors('*'))
    app.use(fileUpload({
        useTempFiles: true
    }))
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.set('views', './views')
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
        function (req, res, next) {
            if (req.isAuthenticated()) {
                res.locals.user = req.user
            }
            next();
        }
    )
    app.use('/', router)

    const users = {}; // Store usernames and their corresponding socket IDs

    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    });
    
    io.on('connection', (socket) => {
        console.log("Socket Connected!!!", socket.id);

        socket.on('name', (name) => {
            console.log("your name is ", name);
            socket.username = name;
            users[name] = socket.id; // Store the username and its corresponding socket ID
            console.log("from connection ",users);
            
        });

        socket.on('private_message_send', (data) => {
            console.log("from send ",users);
            const { recipient, message } = data;
            const recipientSocket = users[recipient];          
            if (recipientSocket) {
                console.log("send now");
                io.to(recipientSocket).emit('private_message_receive', {
                    sender: socket.username,
                    message: message
                });
                
            } else {
                // Handle case when the recipient is not connected
                console.log(`${recipient} is not connected`);
            }
        });

        socket.on('disconnected',()=>{
            console.log("dissconnected");
          
        })
    });


    server.listen(PORT, () => {
        console.log(`Server is running at port ${PORT} with process ID ${pid}`)
    });

}

