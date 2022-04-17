import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducer";
import { productsReducer } from "./products.reducer";

const rootReducer = combineReducers({
  cartReducer,
  productsReducer,
});

export default rootReducer;
