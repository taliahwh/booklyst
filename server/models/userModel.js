import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    condition: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestaps: true }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    numReviews: {
      type: Number,
      requred: true,
      default: 0,
    },
    rating: {
      type: Number,
      requred: true,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    wishlist: [wishlistSchema],
  },
  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
