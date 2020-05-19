import { atom } from "recoil";
import { WINDOW_OBJ } from "../data/globalConstants";

export const userData = atom({
  key: "userData",
  default: {
    profile: {},
    repos: [],
    gists: [],
  },
});

export const searchInput = atom({
  key: "searchInput",
  default: "",
});

// TODO make each window an atom, active & focus a selector
export const windowList = atom({
  key: "windowList",
  default: WINDOW_OBJ,
});

export const menubarButtons = atom({
  key: "menubarButtons",
  default: [],
});
