import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';

// @desc Authenticate user & get token
// @route POST /api/users/signin
// @access Public
const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) {
    res.status(400);
    throw new Error('Invalid password');
  }

  // If user exists and req.password === User's password
  if (user && correctPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.send({ email, password });
});

// @desc Create new user
// @route POST /api/users
// @access Public
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Find user by email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords don't match");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
  res.send({ email, password });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 12);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});
export { signIn, signUp, getUserProfile, updateUserProfile };
