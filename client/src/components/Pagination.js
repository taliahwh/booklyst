import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className="bg-white px-2 py-3 flex justify-center border-t border-gray-200 sm:px-6 mt-20">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-5"
            aria-label="Pagination"
          >
            <Link
              to="/"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <i className="fas fa-chevron-left"></i>
            </Link>

            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/products/${x + 1}`
                }
                className={
                  x + 1 === page
                    ? 'z-10 bg-blue-50 border-blue-600 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                }
              >
                {x + 1}
              </Link>
            ))}

            <Link
              to="/"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </nav>
        </div>
      </div>
    )
  );
};

export default Pagination;
