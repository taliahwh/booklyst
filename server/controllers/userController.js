import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import Book from '../models/bookModel.js';

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

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete user
// @route DEL /api/users/id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'User deleted' });
});

// @desc Get user by id
// @route GET /api/users/id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

// @desc Update user profile
// @route PUT /api/users/:id
// @access Private/Admin
const adminUpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @desc Add product to wishlist
// @route PUT /api/users/wishlist/:id
// @access Private
const addToWishlist = asyncHandler(async (req, res) => {
  const product = await Book.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (product && user) {
    const book = {
      title: product.title,
      author: product.author,
      price: product.price,
      isbn: product.isbn,
      image: product.image,
      genre: product.genre || '',
      condition: product.condition,
      countInStock: product.countInStock,
      language: product.language,
    };

    const index = user.wishlist.findIndex(
      (item) => item.title === product.title
    );

    if (index === -1) {
      // Add product to wishlist
      user.wishlist.push(book);
    } else {
      // Remove product from wishlist
      user.wishlist = user.wishlist.filter((item) => item.title !== book.title);
    }

    await user.save();
    res.status(201).json(user.wishlist);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Get user's wishlist
// @route GET /api/users/wishlist/:id
// @access Private
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (req.params.id.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }
    res.status(200).json(user.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Delete product from wishlist (using id from user's wishlist)
// @route DEL /api/users/wishlist/:id
// @access Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const productFromWishlist = user.wishlist.find(
      (item) => String(item._id) === String(req.params.id)
    );

    const product = await Book.find({ title: productFromWishlist.title });

    const index = user.wishlist.findIndex(
      (item) => item.title === product[0].title
    );

    if (index > 0) {
      user.wishlist = user.wishlist.filter(
        (item) => item.title !== product[0].title
      );
    }

    await user.save();
    res.status(200).json(user.wishlist);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  signIn,
  signUp,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  adminUpdateUser,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
