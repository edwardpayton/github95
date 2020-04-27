import createSubscribedState from "./createSubscribedState";

const initialState = {
  searchInput: "",
};

export const searchValue = createSubscribedState(initialState);
