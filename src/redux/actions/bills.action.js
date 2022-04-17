import * as types from "../action.types";
import axios from "axios";
import { message } from "antd";
import History from "../../utils/navigation";

export const getBills = () => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    dispatch({ type: types.GET_BILLS, payload: { data: response.data.bills } });
    dispatch({ type: types.HIDE_LOADING });
    message.success(response.data.message, 0.5);
  } catch (error) {
    dispatch({ type: types.HIDE_LOADING });
    message.error(error?.response?.data?.message || "Something went wrong");
  }
};

export const chargeBill = (billData) => async (dispatch) => {
  dispatch({ type: types.SHOW_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/bills`,
      billData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    dispatch({ type: types.HIDE_LOADING });
    message.success(response.data.message);
    setTimeout(() => {
      History.push("/bills");
    }, 1000);
  } catch (error) {
    dispatch({ type: types.HIDE_LOADING });
    message.error(error?.response?.data?.message || "Something went wrong");
  }
};
