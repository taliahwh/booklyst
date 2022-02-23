import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { USER_ADMIN_UPDATE_USER_RESET } from '../constants/userConstants';
import { getUserDetails, adminUpdateUser } from '../actions/userActions';

const AdminEditUserScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.userAdminUpdate);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(adminUpdateUser({ _id: id, name, email, isAdmin }));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (successUpdate) {
      dispatch({ type: USER_ADMIN_UPDATE_USER_RESET });
      navigate('/admin/users');
    }

    if (!user.name || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [
    userInfo,
    navigate,
    dispatch,
    id,
    user.name,
    user._id,
    user.email,
    user.isAdmin,
    successUpdate,
  ]);

  return (
    <div className="container">
      <div className="container pt-10 pb-20 bg-white px-4 sm:px-20 lg:px-48">
        {/* User Profile Container */}
        <div className="col-span-2 ">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <h1 className="pb-5 flex justify-center text-2xl font-semibold">
              User Profile
            </h1>

            {successUpdate && (
              <Message variant="success">Profile updated.</Message>
            )}

            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />

            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example@booklyst.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 mr-2 cursor-pointer"
                type="checkbox"
                checked={isAdmin}
                id="isAdmin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label
                className="form-check-label inline-block mb-2 text-sm font-medium text-gray-900"
                htmlFor="isAdmin"
              >
                Admin
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-800 text-white font-semibold text-sm py-2.5 w-36 rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUserScreen;
