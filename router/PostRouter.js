import express from 'express';
import PostController from '../controller/postConntroller.js';


const router = express.Router();
const Post = new PostController();

router.post('/add', Post.addPost);
router.get('/getAll', Post.getAllPost);
router.get('/getSingle/:id', Post.singleUserPost);
router.delete('/delete/:id', Post.deletePost)
router.get('/getSimple', Post.getSimplePost)


export default router;