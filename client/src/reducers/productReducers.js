import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_META_DETAILS_REQUEST,
  PRODUCT_META_DETAILS_SUCCESS,
  PRODUCT_META_DETAILS_FAILURE,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productMetaDetailsReducer = (state = { details: {} }, action) => {
  switch (action.type) {
    case PRODUCT_META_DETAILS_REQUEST:
      return { loading: true, details: {} };
    case PRODUCT_META_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case PRODUCT_META_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
