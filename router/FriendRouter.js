import express from 'express';
import friendController from '../controller/FriendsController.js';

const router = express.Router();
const FriendController = new friendController();
router.post('/add', FriendController.addFriend)

export default router;