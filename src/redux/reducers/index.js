import { combineReducers } from "redux";
// import { billsReducer } from "./bills.reducer";
import { productsReducer } from "./products.reducer";
// import { authReducer } from "./auth.reducer";

const rootReducer = combineReducers({
//   billsReducer,
  productsReducer,
//   authReducer,
});

export default rootReducer;