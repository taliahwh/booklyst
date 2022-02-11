import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';

import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const cart = useSelector((state) => state.cart);

  const { order, success, error } = useSelector((state) => state.orderCreate);

  const addDecimals = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  // Calculate prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 7.99);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  cart.totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  return (
    <div className="container px-10 pt-5 pb-20 bg-white">
      <div className="pb-10 flex justify-center">
        <CheckoutSteps login shipping payment placeOrder />
      </div>

      <div className="grid grid-cols-7 gap-5">
        {/* Order Details */}
        <div className="col-span-7 md:col-span-4 ">
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl font-semibold">Shipping Address</h1>
            <hr className="border-gray-300" />
            <h3 className="text-md">
              Address: {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.state},{' '}
              {cart.shippingAddress.postalCode}
            </h3>

            <h1 className="text-2xl font-semibold">Payment</h1>
            <hr className="border-gray-300" />
            <h3 className="text-md">Method: {cart.paymentMethod}</h3>

            <h1 className="text-2xl font-semibold">Order Items</h1>
            <hr className="border-gray-300" />

            {cartItems.map((item, index) => (
              <div key={index}>
                <div className="flex space-x-4 items-center justify-between pr-8">
                  <div className="flex space-x-4 items-center">
                    <img src={item.image} alt="1984" className="w-12 h-18" />

                    <Link
                      to={`/product/${item.id}`}
                      className="underline font-semibold"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <p>{`${item.qty} x $${item.price.toFixed(2)} = ${(
                    item.qty * item.price
                  ).toFixed(2)}`}</p>
                </div>
                <hr className="border-gray-300 mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-span-7 md:col-span-3">
          <div className="border-1 rounded-md border-gray-300 flex flex-col space-y-2 py-2">
            <h1 className="text-2xl font-semibold py-3 pl-10">Order Summary</h1>
            <hr className="border-gray-300" />

            <div className="flex justify-between px-10 py-1">
              <p className="font-semibold">Items</p>
              <p>{cart.totalItems}</p>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between px-10 py-1">
              <p className="font-semibold">Shipping</p>
              <p>${cart.shippingPrice}</p>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between px-10 py-1">
              <p className="font-semibold">Tax</p>
              <p>${cart.taxPrice}</p>
            </div>
            <hr className="border-gray-300" />

            <div className="flex justify-between px-10 py-1">
              <p className="font-semibold">Total</p>
              <p>${cart.totalPrice}</p>
            </div>
            <hr className="border-gray-300" />

            <button
              onClick={placeOrderHandler}
              className="bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-md font-semibold py-2 mx-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
