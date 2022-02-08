import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Message from '../components/Message';

import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const tax = subtotal * 0.1;

  const totalPrice = subtotal + tax;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="cart-container mx-0 lg:mx-10">
      <div className="cart-items px-4 ">
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty.{' '}
            <Link to="/" className="underline font-semibold text-gray-700">
              Go Back
            </Link>
          </Message>
        ) : (
          <>
            <div className="header flex flex-col space-y-4 mt-4 py-2 ">
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <hr className="bg-gray-200" />
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col pb-3">
                <div className="cart-item-container flex justify-between py-2">
                  {/* Image & title container */}
                  <div className="flex space-x-4 items-center">
                    <img
                      src={item.image}
                      alt="vanishing half"
                      className="h-28 rounded-sm"
                    />

                    {/* Title & metadata */}
                    <div className="flex flex-col w-36">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.author}</p>
                      <p className="text-sm font-semibold mt-1">
                        {item.coverType}
                      </p>
                    </div>
                  </div>

                  {/* Qty container */}
                  <div className="qty-container flex space-x-2 items-center w-28">
                    <select
                      id="qty"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md "
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Container */}
                  <div className="price-container flex items-center w-28">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Trash Container */}
                  <div className="trash-container flex items-center">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i className="fas fa-trash-alt fa-lg blue-500"></i>
                    </button>
                  </div>
                </div>

                <hr className="bg-gray-200 mt-2" />
              </div>
            ))}

            <div className="cart-summary rounded-md flex flex-col justify-end space-y-4 px-4 mt-2">
              <h2 className="justify-end flex text-lg font-semibold">
                Subtotal ({totalItems} items):{' '}
                <span className="ml-1 font-normal">${subtotal.toFixed(2)}</span>
              </h2>
              <h2 className="justify-end flex text-lg font-semibold">
                Tax: <span className="ml-1 font-normal">${tax.toFixed(2)}</span>
              </h2>
              <h2 className="justify-end flex text-lg font-semibold">
                Total:{' '}
                <span className="ml-1 font-normal">
                  ${totalPrice.toFixed(2)}
                </span>
              </h2>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="bg-blue-600 py-2 px-10 flex justify-end text-white font-semibold rounded-md"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
