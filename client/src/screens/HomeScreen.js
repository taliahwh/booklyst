import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../components/Book';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setBooks(data);
    };

    fetchProducts();
  }, []);
  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl md:text-4xl mb-6">Featured Books</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <div key={book._id}>
            <Book book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
