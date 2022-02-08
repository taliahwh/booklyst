import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';

import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        postalCode,
      })
    );

    navigate('/payment');
  };
  return (
    <div className="container px-10 pt-10 pb-20 bg-white">
      <div className="pb-10 flex justify-center">
        <CheckoutSteps login shipping />
      </div>

      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 px-2 md:px-14 lg:px-52">
          <h1 className="text-3xl font-semibold mb-5">Shipping</h1>

          <label className="text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            required
            type="text"
            id="address"
            value={address}
            className="rounded-md text-gray-800 bg-gray-50"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <label className="text-gray-700 pt-2" htmlFor="city">
            City
          </label>
          <input
            required
            type="text"
            id="city"
            value={city}
            className="rounded-md text-gray-800 bg-gray-50"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          />

          <label className="text-gray-700 pt-2" htmlFor="state">
            State
          </label>
          <input
            required
            type="text"
            id="state"
            value={state}
            className="rounded-md text-gray-800 bg-gray-50"
            placeholder="Enter state"
            onChange={(e) => setState(e.target.value)}
          />

          <label className="text-gray-700 pt-2" htmlFor="postalCode">
            Postal Code
          </label>
          <input
            required
            type="text"
            id="postalCode"
            value={postalCode}
            className="rounded-md text-gray-800 bg-gray-50"
            placeholder="Enter postal code"
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <div className="py-1"></div>

          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-md hover:bg-blue-800 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;
