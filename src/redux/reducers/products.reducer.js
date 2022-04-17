import * as types from "../action.types";

const initialState = {
  products: [],
  cartItems: [],
  loading: false,
};

export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case types.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: [...payload.data],
      };
    case types.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: [...payload.data],
      };

    default:
      return state;
  }
};
