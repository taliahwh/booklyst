import express from 'express';
import {
  userValidationRules,
  validate,
  authMiddleware,
  isAdmin,
} from '../middleware/authMiddleware.js';
import {
  signIn,
  signUp,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  adminUpdateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', authMiddleware, isAdmin, getUsers);

router.post('/login', signIn);

router.post('/', userValidationRules(), validate, signUp);

router.get('/profile', authMiddleware, getUserProfile);

router.put('/profile', authMiddleware, updateUserProfile);

router.get('/:id', authMiddleware, isAdmin, getUserById);

router.put('/:id', authMiddleware, isAdmin, adminUpdateUser);

router.delete('/:id', authMiddleware, isAdmin, deleteUser);

export default router;
