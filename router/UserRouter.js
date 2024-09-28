import express from 'express';
import UserController from '../controller/UserController.js';
import passport from 'passport';
import local from '../Security/Passport-local.js';
import googleAuth from '../Security/passport-google.js'
import loginUser from '../controller/LoginUser.js'

const userController = new UserController();
const router = express.Router();
const userLogin = new loginUser();
router.get('/addUser', (req, res) => { return res.render('AddUser') })
router.post('/saveUser', userController.saveUser)
router.get('/getAllUser', passport.cheakAuthentication,userController.getAllUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/getUser/:id', userController.getUser);
router.get('/getSimple', userController.getSimple);
router.post('/varify',userController.varify)
router.get('/page',userController.page)

// for the google authentication
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/user/failed'}),userLogin.loginuser);

// for local Login Router
router.post('/login', passport.authenticate('local', {failureRedirect:'/user/failed',session:true }), userLogin.loginuser);

// for the twitter
router.get('/auth/twitter',passport.authenticate('twitter',{scope:['profile','email']}));
router.get('/auth/twitter/callback',passport.authenticate('twitter',{failureRedirect: '/user/failed'}),userLogin.loginuser);

// for the facebook
router.get('/auth/facebook',passport.authenticate('facebook',{scope:['public_profile','email']}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/user/failed'}),userLogin.loginuser);

// mobile number
router.post('/phone',userLogin.phoneOTP)


//if login gonn fail
router.post('/failed',(req,res)=>{ 
    console.log('inide');
    return res.status(200).json({Error:'Login Failed'})})


export default router;