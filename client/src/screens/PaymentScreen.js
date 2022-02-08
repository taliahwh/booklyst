import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';

import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const { shippingAddress } = useSelector((state) => state.cart);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container px-10 pt-10 pb-20 bg-white">
      <div className="pb-10 flex justify-center">
        <CheckoutSteps login shipping payment />
      </div>

      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 px-2 md:px-14 lg:px-52">
          <h1 className="text-3xl font-semibold mb-5">Payment</h1>

          <h1 className="text-xl font-semibold text-gray-700">Select Method</h1>
          <div className="flex items-center mb-4">
            <input
              id="PayPal"
              type="radio"
              name="paymentMethod"
              value="PayPal"
              className="w-5 h-5 border-gray-500 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label
              htmlFor="paymentMethod"
              className="block ml-2 text-md font-medium text-gray-700 dark:text-gray-300"
            >
              PayPal or Credit Card
            </label>
          </div>

          <div className="py-1"></div>

          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-md hover:bg-blue-800 transition-colors w-44"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;
