import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from '../actions/userActions';

import logo from '../assets/booklyst.svg';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <nav className="bg-white shadow">
      <div className="container px-6 py-4 my-1 mx-auto">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div>
            <NavLink to="/">
              <img src={logo} alt="booklyst" className="max-h-8" />
            </NavLink>
          </div>

          {/* List a Book button */}
          {/* <div>
            <NavLink
              to="/"
              className="text-sm font-semibold text-white bg-blue-600 px-6 py-2 rounded-full transition-colors duration-200 transform  hover:bg-blue-700 "
            >
              + Lyst a Book
            </NavLink>
          </div> */}

          {/* Sign in and cart */}

          <div className="flex space-x-2 items-center">
            <div>
              <NavLink
                to="/cart"
                className="text-sm font-semibold text-blue-600 "
              >
                <CartIcon />
              </NavLink>
            </div>

            {userInfo ? (
              <div>
                <Dropdown />
              </div>
            ) : (
              <div>
                <NavLink
                  to="/login"
                  className="text-sm  py-2 px-2  text-gray-800 rounded-md"
                >
                  Sign In
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

const CartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <button
      className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-600 focus:outline-none focus:none transition duration-150 ease-in-out"
      aria-label="Cart"
    >
      <i className="fas fa-shopping-cart fa-xl"></i>
      <span className="absolute inset-0 object-right-top -mr-6">
        <div
          className={
            totalItems === 0
              ? 'hidden'
              : 'inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-blue-600 text-white'
          }
        >
          {totalItems}
        </div>
      </span>
    </button>
  );
};

const Dropdown = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        type="button"
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:none   focus:outline-none"
      >
        <span className="mx-1">{userInfo.name}</span>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {/* // <!-- Dropdown menu --> */}
      <div
        data-dropdown-toggle="dropdownId"
        id="dropdown"
        className="hidden  text-base  absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
      >
        <NavLink
          to="/"
          className="flex justify-center text-center p-3 mt-2 text-sm text-gray-600 bg-gray-100 transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <div className="mx-1 flex flex-col">
            <h1 className="text-sm font-semibold text-gray-700 ">
              {userInfo.name}
            </h1>
            <p className="text-sm text-gray-500 ">{userInfo.email}</p>
            {userInfo.isAdmin && (
              <span className="mt-1 text-blue-600 font-semibold">Admin</span>
            )}
          </div>
        </NavLink>

        <hr className="border-gray-200 " />

        <NavLink
          to="/profile"
          className="flex items-center p-3 space-x-5 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <i className="fa fa-user fa-lg ml-1"></i>
          <span className="mx-1">View profile</span>
        </NavLink>

        <NavLink
          to="/"
          className="flex items-center p-3 space-x-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <i className="fa fa-book-open fa-lg ml-1"></i>

          <span className="mx-1">Lystings</span>
        </NavLink>

        <NavLink
          to="/myorders"
          className="flex items-center p-3 space-x-6 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <i className="fa fa-receipt fa-lg ml-1"></i>

          <span className="mx-1">Orders</span>
        </NavLink>

        <NavLink
          to="/"
          className="flex items-center p-3 space-x-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <i className="fa fa-heart fa-lg ml-1"></i>

          <span className="mx-1">Wishlist</span>
        </NavLink>

        {userInfo.isAdmin && (
          <>
            <hr className="border-gray-300  " />

            <NavLink
              to="/admin/users"
              className="flex items-center p-3 space-x-4 text-sm bg-blue-100 text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-white "
            >
              <i className="fa fa-users fa-lg ml-1"></i>

              <span className="mx-1">Admin Users</span>
            </NavLink>

            <NavLink
              to="/"
              className="flex items-center p-3 space-x-4 text-sm bg-blue-100 text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-white "
            >
              <i className="fa fa-book fa-lg ml-1"></i>

              <span className="mx-1">Admin Products</span>
            </NavLink>

            <NavLink
              to="/"
              className="flex items-center p-3 space-x-4 text-sm bg-blue-100 text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-white "
            >
              <i className="fa fa-barcode fa-lg ml-1"></i>

              <span className="mx-1">Admin Orders</span>
            </NavLink>
          </>
        )}

        <hr className="border-gray-300  " />

        <NavLink
          to="/"
          className="flex items-center p-3 space-x-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <i className="fa fa-cog fa-lg ml-1"></i>

          <span className="mx-1" onClick={() => dispatch(logout())}>
            Logout
          </span>
        </NavLink>
      </div>
    </>
  );
};
