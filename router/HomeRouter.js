import express from 'express';
import user from './UserRouter.js';
import memory from './memoryRouter.js';
import PostRouter from './PostRouter.js';
import commentRouter from './CommentRouter.js';
import LikeRouter from './likeRouter.js';
import friendRouter from './FriendRouter.js'

const router = express.Router();
router.use('/user', user)
router.use('/memory', memory);
router.use('/post', PostRouter);
router.use('/comment', commentRouter);
router.use('/like', LikeRouter);
router.use('/friend', friendRouter)

export default router;