import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ login, shipping, payment, placeOrder }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          {login ? (
            <Link
              to="/login"
              className="inline-flex items-center text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/login"
              className="pointer-events-none inline-flex items-center text-md font-medium text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Login
            </Link>
          )}
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {shipping ? (
              <Link
                to="/shipping"
                className="pl-2 inline-flex items-center text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Shipping
              </Link>
            ) : (
              <Link
                to="/shipping"
                className="pl-2 pointer-events-none inline-flex items-center text-md font-medium text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Shipping
              </Link>
            )}
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {payment ? (
              <Link
                to="/payment"
                className="pl-2 inline-flex items-center text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Payment
              </Link>
            ) : (
              <Link
                to="/payment"
                className="pl-2 pointer-events-none inline-flex items-center text-md font-medium text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Payment
              </Link>
            )}
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {placeOrder ? (
              <Link
                to="/placeorder"
                className="pl-2 inline-flex items-center text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Place Order
              </Link>
            ) : (
              <Link
                to="/placeorder"
                className="pl-2 pointer-events-none inline-flex items-center text-md font-medium text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Place Order
              </Link>
            )}
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default CheckoutSteps;
