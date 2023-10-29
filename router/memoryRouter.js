import express from 'express';
import memorycontroller from '../controller/memoryController.js'

const router = express.Router();
const memoryController = new memorycontroller();
router.post('/save/:id', memoryController.addMemory)

export default router;