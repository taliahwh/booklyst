import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const successPaymentHandler = (paymentResult) => {
    // console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  useEffect(() => {
    // Using vanilla JS, dynamically adding PayPal script to html body
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onLoad = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <div className="container px-10 pt-5 pb-20 bg-white">
        <div className="pb-10 flex justify-center font-semibold text-lg">
          Order #{order._id}
        </div>

        <div className="grid grid-cols-7 gap-5">
          {/* Order Details */}
          <div className="col-span-7 md:col-span-4 ">
            <div className="flex flex-col space-y-3">
              <h1 className="text-2xl font-semibold">Shipping Address</h1>
              <hr className="border-gray-300" />
              <h3 className="text-md">
                <strong>Name: </strong> {order.user.name}
              </h3>
              <h3 className="text-md">
                <strong>Email: </strong> {order.user.email}
              </h3>
              <h3 className="text-md">
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.state},{' '}
                {order.shippingAddress.postalCode}
              </h3>

              {order.isDelivered ? (
                <Message variant="success">
                  Order delivered on{' '}
                  {moment(order.deliveredAt).format('MMMM Do YYYY, h:mm')}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}

              <h1 className="text-2xl font-semibold">Payment</h1>
              <hr className="border-gray-300" />
              <h3 className="text-md">
                <strong>Method: </strong> {order.paymentMethod}
              </h3>

              {order.isPaid ? (
                <Message variant="success">
                  Order paid on{' '}
                  {moment(order.paidAt).format('MMMM Do YYYY, h:mm')}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}

              <h1 className="text-2xl font-semibold">Order Items</h1>
              <hr className="border-gray-300" />

              {order.orderItems.map((item, index) => (
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
              <h1 className="text-2xl font-semibold py-3 pl-10">
                Order Summary
              </h1>
              <hr className="border-gray-300" />

              <div className="flex justify-between px-10 py-1">
                <p className="font-semibold">Subtotal</p>
                <p>
                  $
                  {(
                    order.totalPrice -
                    (order.taxPrice + order.shippingPrice)
                  ).toFixed(2)}
                </p>
              </div>
              <hr className="border-gray-300" />

              <div className="flex justify-between px-10 py-1">
                <p className="font-semibold">Shipping</p>
                <p>${order.shippingPrice}</p>
              </div>
              <hr className="border-gray-300" />

              <div className="flex justify-between px-10 py-1">
                <p className="font-semibold">Tax</p>
                <p>${order.taxPrice}</p>
              </div>
              <hr className="border-gray-300" />

              <div className="flex justify-between px-10 py-1">
                <p className="font-semibold">Total</p>
                <p>${order.totalPrice}</p>
              </div>

              {!order.isPaid && (
                <>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <>
                      <hr className="border-gray-300" />
                      <div className="px-4">
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
