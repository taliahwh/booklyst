import express from 'express';

import { addOrderItems } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addOrderItems);

export default router;
