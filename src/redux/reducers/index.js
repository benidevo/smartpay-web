import { combineReducers } from "redux";
import { cartReducer } from "./cart.reducer";
import { productsReducer } from "./products.reducer";
import { billsReducer } from "./bills.reducer";

const rootReducer = combineReducers({
  cartReducer,
  productsReducer,
  billsReducer,
});

export default rootReducer;
