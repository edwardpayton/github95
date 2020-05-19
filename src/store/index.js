import { atom } from "recoil";

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
