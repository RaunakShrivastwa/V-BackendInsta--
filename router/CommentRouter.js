import express from 'express';
import commentController from '../controller/CommentController.js';

const router = express.Router();
const comment = new commentController();

router.post('/add', comment.addComment);
router.get('/getAll', comment.getAllComment);
router.get('/userComment/:id', comment.getSingleComment)
router.delete('/delete/:id', comment.deleteComment);
router.get('/getSimple', comment.getComments)

export default router;