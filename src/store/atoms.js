import { atom } from "recoil";
import { WINDOW_OBJ, USER_OBJ } from "../constants";

// General
export const windowObj = atom({
  key: "windowObj",
  default: WINDOW_OBJ,
});

export const menubarButtons = atom({
  key: "menubarButtons",
  default: [],
});

// User window
export const userSearchInput = atom({
  key: "userSearchInput",
  default: "",
});

export const userSearchMatches = atom({
  key: "userSearchMatches",
  default: [],
});

export const userCurrentNum = atom({
  key: "userCurrentNum",
  default: null, // the user.profile.login
});

export const usersListObj = atom({
  key: "usersListObj",
  default: {}, // object of users eg: { userLogin1: {...}, userLogin2: {...}}
});

// Repo window
export const reposSearchInput = atom({
  key: "reposSearchInput",
  default: "",
});

export const reposListObj = atom({
  key: "reposListObj",
  default: {},
});
