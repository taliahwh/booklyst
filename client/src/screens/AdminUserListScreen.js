import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getAdminUsers, deleteUser } from '../actions/userActions';

const AdminUserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, users } = useSelector(
    (state) => state.userAdminUserList
  );

  const { success: successDelete } = useSelector(
    (state) => state.userAdminDelete
  );

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(getAdminUsers());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  return (
    <div className="container px-10 pt-10 pb-20 bg-white">
      <h1 className="pb-5 flex justify-center text-2xl font-semibold">Users</h1>
      {successDelete && <Message variant="success">User deleted.</Message>}
      {loading ? (
        <Loader />
      ) : users.length === 0 ? (
        <Message variant="info">
          No orders found.{' '}
          <Link to="/" className="underline">
            Shop
          </Link>
        </Message>
      ) : (
        <>
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Admin
                        </th>

                        <th scope="col" className="relative py-3 px-6">
                          <span className="sr-only">Edit Admin</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user._id}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {user.name}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {user.isAdmin ? (
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
                              to={`/admin/user/${user._id}`}
                              className="bg-gray-100 hover:bg-gray-200 transion duration-200 p-2 fa-md text-gray-700"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button
                              to={`/order/${user._id}`}
                              onClick={() => deleteHandler(user._id)}
                              className="p-2 fa-md text-white bg-red-600 hover:bg-red-700 transition duration-200"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
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

export default AdminUserListScreen;
