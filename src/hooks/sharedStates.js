import createSubscribedState from "./createSubscribedState";

const initialData = {
  searchInput: "",
  user: {},
  repos: [],
};

export const userData = createSubscribedState(initialData);

// TODO, add focused, add checking for only one focused
const initialWindowState = {
  // [open, active]
  about: [false, false],
  profile: [true, true],
};

export const openWindows = createSubscribedState(initialWindowState);
