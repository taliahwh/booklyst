import express from 'express';

import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, isAdmin, getAllOrders);

router.post('/', authMiddleware, addOrderItems);

router.get('/myorders', authMiddleware, getMyOrders);

router.get('/:id', authMiddleware, getOrderById);

router.put('/:id/pay', authMiddleware, updateOrderToPaid);

router.put('/:id/deliver', authMiddleware, isAdmin, updateOrderToDelivered);

export default router;
