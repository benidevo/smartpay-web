import * as types from "../action.types";

const initialState = {
  cartItems: [],
  loading: false,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.find((item) => item._id === payload.data._id)
          ? state.cartItems.map((item) =>
              item._id === payload.data._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cartItems, payload.data],
      };
    case types.UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === payload.data._id
            ? { ...item, quantity: payload.data.quantity }
            : item
        ),
      };
    case types.DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== payload.data._id
        ),
      };
    default:
      return state;
  }
};
