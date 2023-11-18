import express from 'express';
import user from './UserRouter.js';
import memory from './memoryRouter.js';
import PostRouter from './PostRouter.js';
import commentRouter from './CommentRouter.js';
import LikeRouter from './likeRouter.js';
import friendRouter from './FriendRouter.js';
import LoginUser from '../controller/LoginUser.js';
import passport from 'passport';

const router = express.Router();
const userLogin = new LoginUser();
router.use('/user', user)
router.use('/memory', memory);
router.use('/post', PostRouter);
router.use('/comment', commentRouter);
router.use('/like', LikeRouter);
router.use('/friend', friendRouter);
router.post('/login', passport.authenticate('local', { failureRedirect: '/signup' }), userLogin.loginuser);
router.get('/signup', (req, res) => {
    return res.json({ Message: 'Login Failed' })
})

router.get('/logout', userLogin.logout)


export default router;