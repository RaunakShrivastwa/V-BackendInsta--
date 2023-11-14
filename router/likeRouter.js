import express from 'express';
import LikeController from '../controller/LikeController.js';

const router = express.Router();
const likeController = new LikeController();
router.post('/add', likeController.addLike)

export default router;