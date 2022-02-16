import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js';

import { isAdmin, authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', authMiddleware, isAdmin, createProduct);

router.get('/:id', getProductById);

router.put('/:id', authMiddleware, isAdmin, updateProduct);

router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

export default router;
