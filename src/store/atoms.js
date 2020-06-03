import { atom } from "recoil";
import { WINDOW_OBJ, USER_OBJ } from "../constants";

export const windowObj = atom({
  key: "windowObj",
  default: WINDOW_OBJ,
});

export const menubarButtons = atom({
  key: "menubarButtons",
  default: [],
});

export const userSearchInput = atom({
  key: "userSearch",
  default: "",
});

export const userSearchMatches = atom({
  key: "userSearchMatches",
  default: [],
});

export const userData = atom({
  key: "userData",
  default: USER_OBJ,
});

export const repos = atom({
  key: "repos",
  default: {},
});
