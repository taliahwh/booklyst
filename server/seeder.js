import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import books from './data/books.js';
import users from './data/users.js';
import User from './models/userModel.js';
import Book from './models/bookModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clears the database
    // await Order.deleteMany();
    // await Book.deleteMany();
    await User.deleteMany();

    // Push users file into Users document
    // const createdUsers = await User.insertMany(users);
    await User.insertMany(users);

    // Stores admin user (first in users data file)
    // const adminUser = createdUsers[0]._id;

    // Maps through all books and assigns adminUser to each
    // const sampleBooks = books.map((book) => {
    //   return { ...book, user: adminUser };
    // });

    // await Book.insertMany(sampleBooks);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clears the database
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
