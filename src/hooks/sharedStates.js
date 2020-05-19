import createSubscribedState from "./createSubscribedState";

import { WINDOW_OBJ } from "../data/constants";

const initialWindowState = { ...WINDOW_OBJ };

export const windowList = createSubscribedState(initialWindowState);
