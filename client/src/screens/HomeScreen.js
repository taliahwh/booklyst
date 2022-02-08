import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Book from '../components/Book';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="my-10">
      <h1 className="font-bold text-3xl md:text-4xl mb-6">Featured Books</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product._id}>
              <Book book={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
