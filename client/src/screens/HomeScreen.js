import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Book from '../components/Book';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <div className="my-10">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between">
        <h1 className="font-bold text-3xl md:text-4xl mb-6">Featured Books</h1>
        <SearchBar />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div key={product._id}>
                <Book book={product} />
              </div>
            ))}
          </div>

          <Pagination
            pages={pages}
            page={page}
            totalProducts={products.length}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
