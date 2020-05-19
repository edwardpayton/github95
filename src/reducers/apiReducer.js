import { useReducer } from "react";

export const initialState = {
  data: undefined,
  error: undefined,
  isloading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        error: undefined,
        isloading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        data: action.payload,
        error: undefined,
        isloading: false,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        isloading: false,
      };
    default:
      return {
        ...state,
      };
  }
}

export default () => useReducer(reducer, initialState);
