import createSubscribedState from "./createSubscribedState";

const initialSearchState = {
  searchInput: "",
};

export const searchValue = createSubscribedState(initialSearchState);

// TODO, add focused, add checking for only one focused
const initialWindowState = {
  // [open, active]
  about: [true, true],
};

export const openWindows = createSubscribedState(initialWindowState);
