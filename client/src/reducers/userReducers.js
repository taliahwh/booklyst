import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_RESET,
  USER_LOGOUT,
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
  USER_ADMIN_UPDATE_USER_RESET,
  USER_ADD_TO_WISHLIST_REQUEST,
  USER_ADD_TO_WISHLIST_SUCCESS,
  USER_ADD_TO_WISHLIST_FAILURE,
  USER_WISHLIST_REQUEST,
  USER_WISHLIST_SUCCESS,
  USER_WISHLIST_FAILURE,
  USER_WISHLIST_RESET,
  USER_DELETE_WISHLIST_REQUEST,
  USER_DELETE_WISHLIST_SUCCESS,
  USER_DELETE_WISHLIST_FAILURE,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };

    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_SIGNUP_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, user: {} };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROFILE_FAILURE:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userAdminUserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ADMIN_USER_LIST_REQUEST:
      return { loading: true };

    case USER_ADMIN_USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_ADMIN_USER_LIST_FAILURE:
      return { loading: false, error: action.payload };

    case USER_ADMIN_USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userAdminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_DELETE_USER_REQUEST:
      return { loading: true };

    case USER_ADMIN_DELETE_USER_SUCCESS:
      return { loading: false, success: true };

    case USER_ADMIN_DELETE_USER_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userAdminUpdateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };

    case USER_ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_ADMIN_UPDATE_USER_FAILURE:
      return { loading: false, error: action.payload };

    case USER_ADMIN_UPDATE_USER_RESET:
      return {};

    default:
      return state;
  }
};

export const userGetWishListReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case USER_WISHLIST_REQUEST:
      return { loading: true, ...state };
    case USER_WISHLIST_SUCCESS:
      return { loading: false, success: true, wishlist: action.payload };
    case USER_WISHLIST_FAILURE:
      return { loading: false, error: action.payload };
    case USER_WISHLIST_RESET:
      return { wishlist: [] };
    default:
      return state;
  }
};

export const userAddToWishListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_TO_WISHLIST_REQUEST:
      return { loading: true };
    case USER_ADD_TO_WISHLIST_SUCCESS:
      return { loading: false, success: true, wishlistItem: action.payload };
    case USER_ADD_TO_WISHLIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteWishListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_WISHLIST_REQUEST:
      return { loading: true };
    case USER_DELETE_WISHLIST_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_WISHLIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
