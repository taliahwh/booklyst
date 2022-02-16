import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '../actions/userActions';

import logo from '../assets/booklyst.svg';
import Message from '../components/Message';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, userInfo } = useSelector((state) => state.userSignUp);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signup(name, email, password, confirmPassword));
  };

  useEffect(() => {
    // If a user is already logged in, redirects to homepage
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  return (
    <div className="container px-10 py-20 bg-white">
      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 px-2 md:px-14 lg:px-52">
          <img src={logo} alt="booklyst" className="w-auto h-6" />

          {error && <Message variant="danger">{error}</Message>}

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

          <label
            className="block mb-2 text-sm font-medium text-gray-900 pt-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-900 pt-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            value={confirmPassword}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="py-1"></div>

          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-md hover:bg-blue-800 transition-colors"
          >
            Create an Account
          </button>

          <p className="text-sm block mb-2 font-medium text-gray-900 pt-1">
            Already have an account?{' '}
            <span>
              <Link to="/login" className="underline text-black">
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
