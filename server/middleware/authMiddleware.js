import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// validates jwt
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const userValidationRules = () => {
  // Password must contain at least 1 lowercase, uppercase, and numeric character
  const validPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])');

  return [
    body('name').isLength({ min: 3 }),
    // username muse be an email address
    body('email').isEmail().normalizeEmail(),
    // password must be at least 5 chars and contain an uppercase letter and number
    body('password').isLength({ min: 5 }).matches(validPassword),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req, res);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  // res.status(422).json({ errors: extractedErrors });
  res.status(422);
  throw new Error(
    'Password must be at least 5 characters long, containe one uppercase letter and one number.'
  );
};

export { authMiddleware, userValidationRules, validate, isAdmin };
