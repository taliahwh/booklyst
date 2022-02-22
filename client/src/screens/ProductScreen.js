import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';

import { listProductDetails } from '../actions/productActions';
import { addToWishlist, getWishlist } from '../actions/userActions';

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

  const {
    loading: loadingDetails,
    details,
    error: errorDetails,
  } = useSelector((state) => state.productMetaDetails);

  const {
    loading: loadingDescription,
    description,
    error: errorDescription,
  } = useSelector((state) => state.productDescription);

  const { popularReviews } = useSelector(
    (state) => state.productDescription.description
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const { wishlist } = useSelector((state) => state.userWishlist);
  const { success: successAddToWishlist } = useSelector(
    (state) => state.userAddToWishlist
  );
  const { success: successDeleteWishlist } = useSelector(
    (state) => state.userDeleteWishlist
  );

  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addWishlistHandler = (id) => {
    dispatch(addToWishlist(id));
  };

  const WishlistButton = () => {
    return (
      <>
        {wishlist.find((item) => item.title === product.title) ? (
          <div className="border-blue-600 border-1 px-5 py-2 rounded-md text-blue-600 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 transform">
            <span>
              <i className="fas fa-heart"></i>
            </span>{' '}
            Added to Wishlist
          </div>
        ) : (
          <div className="border-gray-600 border-1 px-5 py-2 rounded-md text-gray-600 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200 transform">
            <span>
              <i className="far fa-heart"></i>
            </span>{' '}
            Add to Wishlist
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
    dispatch(getWishlist(userInfo._id));
  }, [id, dispatch, userInfo._id, successDeleteWishlist, successAddToWishlist]);

  return (
    // Container

    <div className="my-10 ml-2">
      {loadingProduct && loadingDescription ? (
        <Loader />
      ) : errorProduct || errorDescription ? (
        <Message>{errorProduct || errorDescription}</Message>
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
              <div className="flex space-x-4 items-center justify-center md:justify-start">
                <h4 className="text-sm md:text-md text-gray-700">
                  by {product.author}
                </h4>
                <Rating
                  value={description.rating}
                  text={`(${description.ratings}) reviews`}
                />
              </div>

              <hr className="border-gray-300 w-96" />
              <h3 className="text-md md:text-lg font-semibold">
                {product.coverType}
              </h3>
              <h3 className="text-2xl font-bold">${product.price}</h3>

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
                  onClick={() => addWishlistHandler(product._id)}
                >
                  <WishlistButton />
                </button>
              </div>

              {/* User Info Container */}
              <div className="flex flex-col space-y-2">
                <hr className="gray-300 py-1" />
                <p>
                  <strong>Condition: </strong>
                  {product.condition}
                </p>
                <p>
                  <strong>Genre: </strong>Literary Fiction
                </p>
                {details.publishers && (
                  <p>
                    <strong>Publishers: </strong>
                    {details.publishers}
                  </p>
                )}
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
            </div>
          </div>

          {/* Book Overview Container */}
          <div className="flex flex-col space-y-2 pt-10">
            <h1 className="font-bold text-2xl">Book Overview</h1>
            <p className="text-sm text-gray-700 pb-2 leading-relaxed">
              {description.description}
            </p>

            <hr className="gray-300 py-1" />

            <h1 className="font-bold text-2xl pb-2">Popular Reviews</h1>

            {/* {
              popularReviews.slice(0, 5).map((review) => (
                <div key={Math.random()}>
                  <ReviewCard review={review} />
                </div>
              ))} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
