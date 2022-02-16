import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getAllOrders } from '../actions/orderActions';

const AdminOrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, orders } = useSelector(
    (state) => state.orderAdminOrders
  );

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(getAllOrders());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="container px-2 pt-10 pb-20 bg-white">
      <h1 className="pb-5 flex justify-center text-2xl font-semibold">Users</h1>

      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <Message variant="info">
          No orders found.{' '}
          <Link to="/" className="underline">
            Home
          </Link>
        </Message>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b-2">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          User
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
                          <span className="sr-only">Edit Admin</span>
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
                            {order.user.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {moment(order.createdAt).format(
                              'MMMM Do YYYY, h:mm'
                            )}
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

                          <td className="flex py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            <Link
                              to={`/order/${order._id}`}
                              className="bg-gray-100 hover:bg-gray-200 transion duration-200 p-2 fa-md text-gray-700 rounded-md"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrderListScreen;
