import axios from 'axios';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
} from '../constants/orderConstants';

import { CART_ITEMS_RESET } from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    // Remove items from cart
    dispatch({ type: CART_ITEMS_RESET });

    // Remove items in cart from local storage
    localStorage.setItem('cartItems', []);
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
