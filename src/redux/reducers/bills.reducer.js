import * as types from "../action.types";

const initialState = {
  bills: [],
  loading: false,
};

export const billsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_BILLS:
      return {
        ...state,
        bills: [...payload.data],
      };
    default:
      return state;
  }
};
