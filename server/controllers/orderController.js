import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';
import Book from '../models/bookModel.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems === 0) {
    res.status(404);
    throw new Error('No order items');
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // update quantity of products
  await Promise.all(
    orderItems.map(
      async (item) =>
        await Book.findByIdAndUpdate(
          item.id,
          { countInStock: item.countInStock - item.qty },
          { new: true }
        )
    )
  );

  const createdOrder = await order.save();

  // const orderedItems = createdOrder.orderItems.map((item) => item.id);
  // console.log(orderedItems);

  // const products = await Book.find({ _id: orderedItems });
  // console.log(products);

  res.status(201).json(createdOrder);
});

// @desc Get order by ID
// @route get /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email '
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('No order found');
  }
});

// @desc Get logged in user's order
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc Get logged in user's order
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');

  res.json(orders);
});

// @desc Update order to paid
// @route get /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('No order found');
  }
});

// @desc Update order to delivered
// @route get /api/orders/:id/pay
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('No order found');
  }
});

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  getAllOrders,
  updateOrderToDelivered,
};
