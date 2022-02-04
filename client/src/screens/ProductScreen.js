import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProductDetails } from '../actions/productActions';

const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: loadingProduct,
    error: errorProduct,
    product,
  } = useSelector((state) => state.productDetails);
  const { details } = useSelector((state) => state.productMetaDetails);

  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addToWishlist = () => {
    console.log('Add to wishlist');
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  return (
    // Container

    <div className="my-10 ml-2">
      {loadingProduct ? (
        <Loader />
      ) : errorProduct ? (
        <Message>{errorProduct}</Message>
      ) : (
        <>
          <button className="my-4 text-sm text-gray-700">
            <Link to="/">
              <span>
                <i className="fas fa-chevron-left fa-xs gray-700 mr-1"></i>
              </span>
              Go back
            </Link>
          </button>
          {/* Image and Details Container */}
          <div className="flex flex-col md:flex-row space-x-10 items-center md:items-start">
            <img
              className="h-120 md:h-128"
              src={product.image}
              alt={product.title}
            />
            {/* Details Container */}
            <div className="flex flex-col space-y-2 text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-2xl md:text-3xl font-bold">
                {product.title}
              </h1>
              <h4 className="text-sm md:text-md text-gray-700">
                by {product.author}
              </h4>
              <hr className="border-gray-300 w-96" />
              <h3 className="text-md md:text-lg font-semibold">
                {product.coverType}
              </h3>
              <h3 className="text-2xl font-bold">{`$${product.price}`}</h3>

              {/* QTY, Add to Cart, and Wishlist Buttons */}

              <div className="flex space-x-2 py-2 justify-evenly md:justify-start">
                {product.countInStock > 0 && (
                  <select
                    id="qty"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md "
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type="button"
                  onClick={addToCart}
                  disabled={product.countInStock === 0}
                  className="bg-blue-600 px-8 py-2 rounded-md text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 transform"
                >
                  {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  onClick={addToWishlist}
                  className="border-gray-600 border-1 px-5 py-2 rounded-md text-gray-600 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 transform"
                >
                  <span>
                    <i className="fas fa-heart"></i>
                  </span>{' '}
                  Add to Wishlist
                </button>
              </div>

              {/* User Info Container */}
              <div className="flex space-x-4 pt-4 items-center justify-center md:justify-start">
                <div className="userPhoto">
                  <img
                    className="rounded-full h-12 w-12"
                    src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                    alt="user"
                  />
                </div>

                <div className="userDetails flex flex-col space-y-1">
                  <h4 className="font-semibold">Toni M.</h4>

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
                </div>
              </div>
            </div>
          </div>

          {/* Book Overview Container */}
          <div className="flex flex-col space-y-2 pt-10">
            <h1 className="font-bold text-2xl">Book Overview</h1>
            <p className="text-sm text-gray-700 pb-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo non
              eligendi in facilis at, quibusdam explicabo tenetur fugiat ullam.
              Blanditiis libero iure magni corporis, sint eum dolorum sunt
              repudiandae natus. Tenetur alias autem voluptates porro laborum
              sequi doloribus cupiditate maxime ullam nostrum id at aliquid
              accusantium eos et, sapiente dignissimos saepe? Velit eaque
              dignissimos esse debitis placeat, saepe quibusdam culpa.
            </p>
            <hr className="gray-300 py-1" />
            <p>
              <strong>Condition: </strong>
              {product.condition}
            </p>
            <p>
              <strong>Genre: </strong>Literary Fiction
            </p>
            <p>
              <strong>Publishers: </strong>
              {details.publishers}
            </p>
            <p>
              <strong>Release Date: </strong>
              {details.publish_date}
            </p>
            <p>
              <strong>Language: </strong>English
            </p>
            <p>
              <strong>Print length: </strong>
              {details.number_of_pages || 'N/A'} pages
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
