import * as types from "../action.types";
import axios from "axios";
import { message } from "antd";
import History from "../../utils/navigation";

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    delete userData.confirmPassword;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email: userData.email,
        password: userData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("accessToken", loginResponse.data.accessToken);
    message.success(response.data.message);
    dispatch({ type: types.HIDE_LOADING });
    setTimeout(() => {
      History.push("/");
    }, 1500);
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};

export const authenticateUser = (userData) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    message.success(response.data.message);
    dispatch({ type: types.HIDE_LOADING });
    setTimeout(() => {
      History.push("/");
    }, 1500);
  } catch (error) {
    message.error(error.response.data.message);
    dispatch({ type: types.HIDE_LOADING });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("accessToken");
};
