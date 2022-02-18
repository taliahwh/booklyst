import asyncHandler from 'express-async-handler';

import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Book.find({});

  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Book.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Book.findByIdAndDelete(req.params.id);

  if (product) {
    res.json({ message: 'Product deleted.' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create new product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Book({
    user: req.user._id,
    title: 'Sample Title',
    author: 'Sample Author',
    image: '/images/sample.jpg',
    genre: 'Sample Genre',
    isbn: 'Sample ISBN',
    language: 'English',
    condition: 'Sample Condition',
    countInStock: 0,
    price: 0,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    image,
    isbn,
    genre,
    language,
    condition,
    price,
    countInStock,
  } = req.body;

  const product = await Book.findByIdAndUpdate(req.params.id, {
    title,
    author,
    image,
    isbn,
    genre,
    language,
    condition,
    price,
    countInStock,
  });

  const updatedProduct = await product.save();

  res.json(updatedProduct);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
