import { atom } from "recoil";
import { WINDOW_OBJ, USER_OBJ } from "../constants";

export const searchInput = atom({
  key: "searchInput",
  default: "",
});

export const windowObj = atom({
  key: "windowObj",
  default: WINDOW_OBJ,
});

export const menubarButtons = atom({
  key: "menubarButtons",
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
