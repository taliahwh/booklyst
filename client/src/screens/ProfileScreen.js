import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Message from '../components/Message';

import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (!user.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [userInfo, navigate, dispatch, user.name, user.email]);

  return (
    <div className="container">
      <div className="grid grid-cols-7 gap-2">
        {/* User Profile Container */}
        <div className="col-span-2 ">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-5">User Profile</h1>

            {message && <Message variant="danger">{message}</Message>}
            {success && <Message variant="success">Profile updated.</Message>}

            <label className="text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="rounded-md text-gray-800 bg-gray-100 border-none"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="rounded-md text-gray-800 bg-gray-100 border-none"
              placeholder="example@booklyst.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-gray-700 pt-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="rounded-md text-gray-800 bg-gray-100 border-none"
              placeholder="•••••••"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-gray-700 pt-2" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              className="rounded-md text-gray-800 bg-gray-100 border-none"
              placeholder="•••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-800 text-white font-semibold text-sm py-2.5 w-36 rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
          </form>
        </div>
        {/* Order Details Container */}
        <div className="bg-blue-100 col-span-5">Order details</div>
      </div>
    </div>
  );
};

export default ProfileScreen;
