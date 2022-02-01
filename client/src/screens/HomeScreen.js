import React from 'react';
import books from '../assets/books';

import Book from '../components/Book';

const HomeScreen = () => {
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
