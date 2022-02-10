import express from 'express';

import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addOrderItems);

router.get('/myorders', authMiddleware, getMyOrders);

router.get('/:id', authMiddleware, getOrderById);

router.put('/:id/pay', authMiddleware, updateOrderToPaid);

export default router;
