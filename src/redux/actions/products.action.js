import * as types from "../action.types";
import axios from "axios";
import { message } from "antd";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    dispatch({
      type: types.GET_ALL_PRODUCTS,
      payload: { data: response.data.products },
    });
    dispatch({ type: types.HIDE_LOADING });
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};

export const getProductsByCategory = (categoryName) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/category/${categoryName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    dispatch({
      type: types.GET_PRODUCTS_BY_CATEGORY,
      payload: { data: response.data.products },
    });
    dispatch({ type: types.HIDE_LOADING });
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};
