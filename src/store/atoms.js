import { atom } from "recoil";

import memoize from "../utilities/memoize";

import { WINDOW_OBJ } from "../constants";

// General
export const windowObj = atom({
  key: "windowObj",
  default: WINDOW_OBJ,
});

export const menubarButtons = atom({
  key: "menubarButtons",
  default: [],
});

export const focusedElement = atom({
  key: "focusedElement",
  default: "",
});

// Memoized with ID (id = user, repositories, ...)
export const searchInputOfType = memoize((type) =>
  atom({
    key: `searchInput${type}`,
    default: "",
  })
);

export const searchResultsOfType = memoize((type) =>
  atom({
    key: `searchResults${type}`,
    default: [],
  })
);

// User window
export const userCurrentNum = atom({
  key: "userCurrentNum",
  default: null, // the user.profile.login
});

export const usersListObj = atom({
  key: "usersListObj",
  default: {}, // object of users eg: { userLogin1: {...}, userLogin2: {...}}
});

// Repo window
export const reposListObj = atom({
  key: "reposListObj",
  default: {},
});

export const reposSearchTopic = atom({
  key: "reposSearchTopic",
  default: {},
});
