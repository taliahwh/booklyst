import React from 'react';
import { useNavigate } from 'react-router-dom';

import Rating from './Rating';

const Book = ({ book }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/product/${book._id}`);
  };
  return (
    <div className="flex flex-col p-1 cursor-pointer" onClick={openPost}>
      <img className="mb-2" src={book.image} alt={book.title} />
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-xs text-gray-600">{book.author}</p>
      <Rating value={book.rating} text={`${book.numReviews} reviews`} />

      <h4 className="price text-xl font-semibold">{`$${book.price.toFixed(
        2
      )}`}</h4>
    </div>
  );
};

export default Book;
