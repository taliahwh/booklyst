import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productListReducer,
  productDetailsReducer,
  productMetaDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
  userLoginReducer,
  userSignUpReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userAdminUserListReducer,
  userAdminDeleteUserReducer,
  userAdminUpdateUserReducer,
  userGetWishListReducer,
  userAddToWishListReducer,
  userDeleteWishListReducer,
} from './reducers/userReducers';

import {
  orderCreatorReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyOrdersReducer,
  orderAdminOrdersReducer,
  orderDeliverReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productMetaDetails: productMetaDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAdminUserList: userAdminUserListReducer,
  userAdminDelete: userAdminDeleteUserReducer,
  userAdminUpdate: userAdminUpdateUserReducer,
  userWishlist: userGetWishListReducer,
  userAddToWishlist: userAddToWishListReducer,
  userDeleteWishlist: userDeleteWishListReducer,
  orderCreate: orderCreatorReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyOrders: orderMyOrdersReducer,
  orderAdminOrders: orderAdminOrdersReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// Initial loading when the redux store loads
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
