import { useReducer } from "react";

export const initialState = {
  hasData: false,
  isLoading: false,
  hasErrored: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        hasErrored: false,
      };
    case "SUCCESS":
      return {
        ...state,
        hasData: true,
        isLoading: false,
        hasErrored: false,
      };
    case "ERROR":
      return {
        ...state,
        hasData: false,
        isLoading: false,
        hasErrored: true,
      };
    default:
      return {
        ...state,
      };
  }
}

export default () => useReducer(reducer, initialState);
