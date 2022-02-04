import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Maps through state's cartItems and check if item already exists in cartItems
      const existingItem = state.cartItems.find((x) => x.id === item.id);

      /* If there is an existing item in cart, return the state and the item unchanged,
      else, add the item to the state's cart items */
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existingItem.id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    /* Return the state and all items that arent equal
     to the action.payload (item to be deleted) */
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
