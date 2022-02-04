import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: data._id,
      title: data.title,
      author: data.author,
      coverType: data.coverType,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // Saving data to 'cartItems' in local storage in the cart state (from redux)
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  // Retrieve cart items from local storage in initialState in store.js
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });

  // Saving data to 'cartItems' in local storage in the cart state (from redux)
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
