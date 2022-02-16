import React from 'react';
import { useSelector } from 'react-redux';

const ShippingBanner = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const amountToFreeShipping = 50 - subtotal;

  return (
    <div className="bg-blue-500 shadow-md rounded-md">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center justify-center">
            <span className="flex py-2 rounded-lg bg-none text-white">
              <i className="fa fa-cart-shopping"></i>
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">
                Add $5.99 to your cart to get free shipping!
              </span>
              <span className="hidden md:inline">
                Add ${amountToFreeShipping.toFixed(2)} to your cart to get free
                shipping!
              </span>
            </p>
          </div>

          {/* <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md  focus:outline-none "
            >
              <span className="sr-only">Dismiss</span>
              <i className="fa fa-times text-white"></i>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShippingBanner;
