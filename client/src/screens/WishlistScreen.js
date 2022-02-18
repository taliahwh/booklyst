import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { getWishlist, deleteFromWishlist } from '../actions/userActions';

const WishListCard = ({ product }) => {
  const dispatch = useDispatch();

  const deleteWishlistHandler = (id) => {
    dispatch(deleteFromWishlist(id));
    // console.log('Add to wishlist');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md flex space-x-2 items-center">
      <Link to="/">
        <img
          className="h-48
        "
          src={product.image}
          alt="book"
        />
      </Link>
      <div className="p-5 flex flex-col">
        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>

        <p className="text-center mb-3 font-normal text-sm text-gray-700 ">
          {product.author}
        </p>
        <div className="flex pt-2 justify-between space-x-10">
          <button
            href="/"
            className="inline-flex items-center  py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy now
            <i className="fa fa-arrow-right-long pl-2"></i>
          </button>
          <button onClick={() => deleteWishlistHandler(product._id)}>
            <i className="fa fa-heart fa-xl text-red-700"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, wishlist } = useSelector(
    (state) => state.userWishlist
  );
  const { success: successDelete } = useSelector(
    (state) => state.userDeleteWishlist
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    dispatch(getWishlist(userInfo._id));
  }, [userInfo, navigate, dispatch, successDelete]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : wishlist.length === 0 ? (
        <Message>No products in wishlist</Message>
      ) : (
        <div className="profile-container px-6  lg:px-20 flex flex-col space-y-10 mb-10">
          <h1 className="text-2xl font-semibold mt-10 text-center">Wishlist</h1>
          {/* {successDelete && (
            <Message variant="success">Removed from wishlist.</Message>
          )} */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlist.map((product) => (
              <div key={product.title}>
                <WishListCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
