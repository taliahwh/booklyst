import express from 'express';
import {
  userValidationRules,
  validate,
  authMiddleware,
} from '../middleware/authMiddleware.js';
import {
  signIn,
  signUp,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', userValidationRules(), validate, signUp);

router.post('/login', signIn);

router.get('/profile', authMiddleware, getUserProfile);

router.put('/profile', authMiddleware, updateUserProfile);

export default router;
