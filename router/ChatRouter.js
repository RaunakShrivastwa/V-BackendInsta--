import express from 'express';
import ChatController from '../controller/ChatController.js';

const chat =  new ChatController();

const router = express();
router.get('/chat/:name',chat.chatNow)

export default router;