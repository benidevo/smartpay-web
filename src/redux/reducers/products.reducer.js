import * as types from "../action.types";

const initialState = {
  products: [],
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
    case types.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload.data],
      };
    case types.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== payload.data
        ),
      };
    case types.EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === payload.data._id ? payload.data : product
        ),
      };
    default:
      return state;
  }
};
