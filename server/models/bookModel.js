import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestaps: true }
);

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      requred: true,
    },
    image: {
      type: String,
      requred: true,
    },
    author: {
      type: String,
      requred: true,
    },
    genre: {
      type: String,
      requred: true,
    },
    reviews: [reviewSchema],
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
    coverType: {
      type: String,
      requred: true,
    },
    language: {
      type: String,
      requred: true,
    },
    isbn: {
      type: String,
      requred: true,
    },
    condition: {
      type: String,
      requred: true,
    },
    countInStock: {
      type: Number,
      requred: true,
      default: 0,
    },
    price: {
      type: Number,
      requred: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      requred: true,
      default: 0,
    },
  },
  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
