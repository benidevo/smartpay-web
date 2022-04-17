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

export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/products`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    dispatch({
      type: types.ADD_PRODUCT,
      payload: { data: response.data.product },
    });

    dispatch({ type: types.HIDE_LOADING });
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};

export const editProduct = (values, id) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });

  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/products/${id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    dispatch({
      type: types.EDIT_PRODUCT,
      payload: { data: response.data.product },
    });
    dispatch({ type: types.HIDE_LOADING });
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    dispatch({
      type: types.DELETE_PRODUCT,
      payload: { data: id },
    });
    dispatch({ type: types.HIDE_LOADING });
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};
