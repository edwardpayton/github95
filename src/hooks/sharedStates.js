import createSubscribedState from "./createSubscribedState";

const initialState = {
  input: "",
};

export const searchValue = createSubscribedState(initialState);
