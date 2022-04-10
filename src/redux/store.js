import { combineReducers, createStore } from "redux";

import { rootReducer } from "./rootReducer";

const finalReducer = combineReducers({
  rootReducer: rootReducer,
});

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  },
};

const store = createStore(finalReducer, initialState);

export default store;
