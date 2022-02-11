import mongoose from 'mongoose';

const userReviewSchema = mongoose.Schema(
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
    reviews: [userReviewSchema],
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
    wishlist: { type: [String] },
  },
  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
