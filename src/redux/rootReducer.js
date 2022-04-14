const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: state.cartItems.find(
          (item) => item._id === action.payload._id
        )
          ? state.cartItems.map((item) =>
              item._id === action.payload._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cartItems, action.payload],
      };
    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
