import * as types from "../action.types";

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: types.ADD_TO_CART,
    payload: { data: { ...product, quantity: 1 } },
  });
};

export const updateCartItem = (product, productQuantity) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CART_ITEM,
    payload: { data: { ...product, quantity: productQuantity } },
  });
};

export const deleteCartItem = (product) => (dispatch) => {
  dispatch({
    type: types.DELETE_CART_ITEM,
    payload: { data: product },
  });
};
