import asyncHandler from 'express-async-handler';

import books from '../data/books.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  res.json(books);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const book = books.find((b) => b._id === req.params.id);
  res.json(book);
});

export { getProducts, getProductById };
