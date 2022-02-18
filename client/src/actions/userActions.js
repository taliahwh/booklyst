import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_ADMIN_USER_LIST_REQUEST,
  USER_ADMIN_USER_LIST_SUCCESS,
  USER_ADMIN_USER_LIST_FAILURE,
  USER_ADMIN_USER_LIST_RESET,
  USER_ADMIN_DELETE_USER_REQUEST,
  USER_ADMIN_DELETE_USER_SUCCESS,
  USER_ADMIN_DELETE_USER_FAILURE,
  USER_ADMIN_UPDATE_USER_REQUEST,
  USER_ADMIN_UPDATE_USER_SUCCESS,
  USER_ADMIN_UPDATE_USER_FAILURE,
  USER_ADD_TO_WISHLIST_REQUEST,
  USER_ADD_TO_WISHLIST_SUCCESS,
  USER_ADD_TO_WISHLIST_FAILURE,
  USER_WISHLIST_REQUEST,
  USER_WISHLIST_SUCCESS,
  USER_WISHLIST_FAILURE,
  USER_DELETE_WISHLIST_REQUEST,
  USER_DELETE_WISHLIST_SUCCESS,
  USER_DELETE_WISHLIST_FAILURE,
} from '../constants/userConstants';

import { ORDER_MY_ORDERS_RESET } from '../constants/orderConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Save userInfo to local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
  localStorage.removeItem('__paypal_storage__');
  localStorage.removeItem('__belter_experiment_storage__');

  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_ORDERS_RESET });
  dispatch({ type: USER_ADMIN_USER_LIST_RESET });
  document.location.href = '/';
};

export const signup =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password, confirmPassword },
        config
      );

      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });

      // Login user directly after successful sign up
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      // Save userInfo to local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/users/profile', user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Save userInfo to local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload: message,
    });
  }
};

export const getAdminUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_USER_LIST_REQUEST,
    });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);

    dispatch({ type: USER_ADMIN_USER_LIST_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_ADMIN_USER_LIST_FAILURE,
      payload: message,
    });
  }
};

export const adminUpdateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_UPDATE_USER_REQUEST,
    });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: USER_ADMIN_UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_UPDATE_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_DELETE_USER_REQUEST,
    });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_ADMIN_DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_DELETE_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToWishlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ADD_TO_WISHLIST_REQUEST });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/wishlist/${id}`, {}, config);

    dispatch({ type: USER_ADD_TO_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ADD_TO_WISHLIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFromWishlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_WISHLIST_REQUEST });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/wishlist/${id}`, config);

    dispatch({ type: USER_DELETE_WISHLIST_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_WISHLIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWishlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_WISHLIST_REQUEST });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/wishlist/${id}`, config);

    dispatch({ type: USER_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_WISHLIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
