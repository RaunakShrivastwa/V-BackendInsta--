import express from 'express';
import UserController from '../controller/UserController.js';
const userController = new UserController();
const router = express.Router();

router.get('/addUser', (req, res) => { return res.render('AddUser') })
router.post('/saveUser', userController.saveUser)
router.get('/getAllUser', userController.getAllUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/getUser/:id', userController.getUser)



export default router;