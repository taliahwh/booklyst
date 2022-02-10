import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getMyOrders } from '../actions/orderActions';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, orders } = useSelector(
    (state) => state.orderMyOrders
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getMyOrders());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="container px-10 pt-10 pb-20 bg-white">
      <h1 className="pb-10 flex justify-center text-2xl font-semibold">
        My Orders
      </h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b-2">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Paid
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Delivered
                    </th>
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {order._id}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {moment(order.createdAt).format('MMMM D, YYYY')}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        ${order.totalPrice}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {order.isPaid ? (
                          <i
                            className="fas fa-check"
                            style={{ color: '#16a34a' }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {order.isDelivered ? (
                          <i
                            className="fas fa-check"
                            style={{ color: '#16a34a' }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a href="/" className="text-blue-600  hover:underline">
                          Order Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListScreen;
