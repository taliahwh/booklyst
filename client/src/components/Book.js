import React from 'react';
import { useNavigate } from 'react-router-dom';

const Book = ({ book }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/product/${book._id}`);
  };
  return (
    <div
      className="flex flex-col p-1 space-y-1 cursor-pointer"
      onClick={openPost}
    >
      <img src={require(`../assets/${book.image}`)} alt={book.title} />
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-xs text-gray-600">{book.author}</p>

      <div className="location flex space-x-2 items-center">
        <i className="fas fa-map-marker-alt fa-xs text-blue-600"></i>
        <p className="text-xs text-blue-600">{book.location}</p>
      </div>

      <h4 className="price text-xl font-semibold">
        {`$${book.price.toFixed(2)}`}
      </h4>
    </div>
  );
};

export default Book;
