import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/booklyst.svg';

const Header = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container px-6 py-4 my-1 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <NavLink to="/">
              <img src={logo} alt="booklyst" className="max-h-8" />
            </NavLink>
          </div>

          <div className="flex space-x-2 items-center">
            <div>
              <NavLink
                to="/"
                className="text-sm font-semibold text-white bg-blue-600 px-6 py-2 rounded-full transition-colors duration-200 transform  hover:bg-blue-700 "
              >
                + Lyst a Book
              </NavLink>
            </div>

            <div>
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

const Dropdown = () => {
  return (
    <>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        type="button"
        className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:none   focus:outline-none"
      >
        <span className="mx-1">Jane Doe</span>
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
          className="flex items-center p-3 mt-2 text-sm text-gray-600 transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <img
            className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 "
            src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
            alt="jane avatar"
          />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 ">Jane Doe</h1>
            <p className="text-sm text-gray-500 ">janedoe@exampl.com</p>
          </div>
        </NavLink>

        <hr className="border-gray-200 " />

        <NavLink
          to="/"
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
          to="/"
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

        <hr className="border-gray-200  " />

        <NavLink
          to="/"
          className="flex items-center p-3 space-x-4 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 "
        >
          <i className="fa fa-cog fa-lg ml-1"></i>

          <span className="mx-1">Logout</span>
        </NavLink>
      </div>
    </>
  );
};