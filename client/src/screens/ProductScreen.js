import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductScreen = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    numOfPages: 0,
    isbn: [],
    publishDate: '',
    publishers: [],
  });

  const addToCart = () => {
    console.log('Add to cart');
  };

  const addToWishlist = () => {
    console.log('Add to wishlist');
  };

  useEffect(() => {
    const fetchProductById = async () => {
      const { data } = await axios.get(`/api/products/${id}`);

      setBook(data);

      const {
        data: { number_of_pages, isbn_10, publish_date, publishers },
      } = await axios.get(`https://openlibrary.org/isbn/1984822187.json`);

      setBookDetails({
        numOfPages: number_of_pages,
        isbn: isbn_10,
        publishDate: publish_date,
        publishers: publishers,
      });

      // console.log(number_of_pages, isbn_10, publish_date, publishers);

      // console.log(bookDetails);
    };

    fetchProductById();
  }, [id]);

  return (
    // Container
    <div className="my-10 ml-2">
      {/* Image and Details Container */}
      <div className="flex flex-col md:flex-row space-x-10 space-y-4 items-center md:items-start">
        <img className="h-120 md:h-128" src={book.image} alt={book.title} />

        {/* Details container */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">{book.title}</h1>
          <h4 className="text-sm md:text-md text-gray-700">by {book.author}</h4>
          <hr className="border-gray-300 w-96" />
          <h3 className="text-md md:text-lg font-semibold">{book.coverType}</h3>
          <h3 className="text-2xl font-bold">{`$${book.price}`}</h3>

          {/* Button container */}
          <div className="flex space-x-2 py-2">
            <button
              type="button"
              onSubmit={addToCart}
              className="bg-blue-600 px-6 py-2 rounded-full text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 transform"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onSubmit={addToWishlist}
              className="border-blue-600 border-2 px-6 py-2 rounded-full text-blue-600 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 transform"
            >
              <span>
                <i className="fas fa-heart"></i>
              </span>{' '}
              Add to Wishlist
            </button>
          </div>

          {/* User info container */}
          <div className="flex space-x-4 pt-4 items-center">
            <div className="userPhoto">
              <img
                className="rounded-full h-16 w-16"
                src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                alt="user"
              />
            </div>

            <div className="userDetails flex flex-col space-y-1">
              <h4 className="font-semibold">Toni M.</h4>

              <div className="location flex space-x-2 items-center">
                <i className="fas fa-map-marker-alt fa-xs text-blue-600"></i>
                <p className="text-sm text-blue-600">{book.location}</p>
              </div>

              <div className="location flex space-x-2 items-center">
                <div className="starsTemporary flex space-x-2">
                  <i className="fas fa-star fa-xs text-yellow-300"></i>
                  <i className="fas fa-star fa-xs text-yellow-300"></i>
                  <i className="fas fa-star fa-xs text-yellow-300"></i>
                  <i className="fas fa-star fa-xs text-yellow-300"></i>
                  <i className="fas fa-star fa-xs text-yellow-300"></i>
                </div>

                <h4 className="text-sm text-blue-600">5 Ratings</h4>
              </div>

              <h4 className="text-sm text-blue-600">Books for sale: 4</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Book Overview */}
      <div className="flex flex-col space-y-2 pt-10">
        <h1 className="font-bold text-2xl">Book Overview</h1>
        <p className="text-sm text-gray-700 pb-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo non
          eligendi in facilis at, quibusdam explicabo tenetur fugiat ullam.
          Blanditiis libero iure magni corporis, sint eum dolorum sunt
          repudiandae natus. Tenetur alias autem voluptates porro laborum sequi
          doloribus cupiditate maxime ullam nostrum id at aliquid accusantium
          eos et, sapiente dignissimos saepe? Velit eaque dignissimos esse
          debitis placeat, saepe quibusdam culpa.
        </p>
        <hr className="gray-300 py-1" />
        <p>
          <strong>Condition: </strong>Very Good
        </p>
        <p>
          <strong>Genre: </strong>Literary Fiction
        </p>
        <p>
          <strong>Publishers: </strong>
          {bookDetails.publishers}
        </p>
        <p>
          <strong>Release Date: </strong>
          {bookDetails.publishDate}
        </p>
        <p>
          <strong>Language: </strong>English
        </p>
        <p>
          <strong>Print length: </strong>
          {bookDetails.numOfPages} pages
        </p>
      </div>
    </div>
  );
};

export default ProductScreen;
