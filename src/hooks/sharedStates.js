import createSubscribedState from "./createSubscribedState";

import { WINDOW_OBJ } from "../data/constants";

const initialData = {
  searchInput: "",
  user: {},
  repos: [],
};

export const userData = createSubscribedState(initialData);

const initialWindowState = { ...WINDOW_OBJ };

export const windowList = createSubscribedState(initialWindowState);
