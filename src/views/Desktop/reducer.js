import { useReducer } from "react";

export const initialState = {
  showLoader: false,
  showTaskbar: false,
  showIcons: false,
  showWindows: false,
};

export const SET_LOADING = "SET_LOADING";
export const SET_TASKBAR = "SET_TASKBAR";
export const SET_ICONS = "SET_ICONS";
export const SET_WINDOWS = "SET_WINDOWS";

function reducer(state, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        showLoader: true,
      };
    case "SET_TASKBAR":
      return {
        ...state,
        showLoader: false,
        showTaskbar: true,
      };
    case "SET_ICONS":
      return {
        ...state,
        showLoader: true,
        showIcons: true,
      };
    case "SET_WINDOWS":
      return {
        ...state,
        showLoader: false,
        showWindows: true,
      };
    default:
      return { ...state };
  }
}

export default () => useReducer(reducer, initialState);
