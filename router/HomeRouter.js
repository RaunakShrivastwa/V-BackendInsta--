import express from 'express';
import user from './UserRouter.js';
import memory from './memoryRouter.js'
const router = express.Router();
router.use('/user',user)
router.use('/memory',memory)

export default router;