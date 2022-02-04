import express from 'express';
import { userValidationRules, validate } from '../middleware/authMiddleware.js';
import { signIn, signUp } from '../controllers/userController.js';

const router = express.Router();

router.post('/', userValidationRules(), validate, signUp);

router.post('/login', signIn);

export default router;
