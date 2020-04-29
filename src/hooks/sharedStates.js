import createSubscribedState from "./createSubscribedState";

const initialData = {
  searchInput: "",
  user: {},
  repos: [],
};

export const userData = createSubscribedState(initialData);

// TODO, add focused, add checking for only one focused
const initialWindowState = {
  /* [
      open (show button), 
      active (show window), 
      focused (is active window, button pressed) TODO
    ] */
  about: [false, false],
  profile: [true, false],
};

export const windowList = createSubscribedState(initialWindowState);
