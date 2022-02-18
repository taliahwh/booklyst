import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_RESET,
  ORDER_MY_ORDERS_REQUEST,
  ORDER_MY_ORDERS_SUCCESS,
  ORDER_MY_ORDERS_FAILURE,
  ORDER_MY_ORDERS_RESET,
  ORDER_ADMIN_ORDERS_REQUEST,
  ORDER_ADMIN_ORDERS_SUCCESS,
  ORDER_ADMIN_ORDERS_FAILURE,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAILURE,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

export const orderCreatorReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case ORDER_CREATE_FAILURE:
      return { loading: false, error: action.payload };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, order: {} };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };

    case ORDER_PAY_FAILURE:
      return { loading: false, error: action.payload };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };

    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };

    case ORDER_DELIVER_FAILURE:
      return { loading: false, error: action.payload };

    case ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};

export const orderMyOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case ORDER_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_MY_ORDERS_FAILURE:
      return { loading: false, error: action.payload };

    case ORDER_MY_ORDERS_RESET:
      return { orders: [] };

    default:
      return state;
  }
};

export const orderAdminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ADMIN_ORDERS_REQUEST:
      return { ...state, loading: true };

    case ORDER_ADMIN_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_ADMIN_ORDERS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
