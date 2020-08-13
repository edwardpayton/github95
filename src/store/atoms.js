import { atom } from "recoil";

import memoize from "../utilities/memoize";

import { WINDOW_OBJ } from "../constants";

// General
export const rateLimit = atom({
  key: "rateLimit",
  default: {},
});

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

// Memoized with ID (id = user OR repositories)
export const searchInputOfType = memoize((type) =>
  atom({
    key: `searchInput${type}`,
    default: "",
  })
);

export const searchStatusOfType = memoize((type, defaultState) =>
  atom({
    key: `searchStatusOfType${type}`,
    default: defaultState,
  })
); // This one is to be used in a selector, called with defaultState

export const searchResultsOfType = memoize((type) =>
  atom({
    key: `searchResults${type}`,
    default: [],
  })
);

export const currentRecordOfType = memoize((type) =>
  atom({
    key: `currentRecordOfType${type}`,
    default: null, // the user.profile.login OR repo name + owner
  })
);

// User window
export const usersListObj = atom({
  key: "usersListObj",
  default: {}, // object of users eg: { userLogin1: {...}, userLogin2: {...}}
});

export const userChartData = atom({
  key: `userChartData`,
  default: null,
});

export const userEventsData = atom({
  key: `userEventsData`,
  default: {},
});

// Repo window
export const reposSearchTopic = atom({
  key: "reposSearchTopic",
  default: {},
});

export const reposSort = atom({
  key: "reposSort",
  default: "",
});

export const repoWindows = atom({
  key: `repoWindows`,
  default: {},
});

export const repoFiles = atom({
  key: "repoFiles",
  default: {},
});

// Trending window
export const trending = atom({
  key: `trending`,
  default: {
    repositories: [],
    developers: [],
  },
});

// Most followed repos window
export const mostFollowed = atom({
  key: "mostFollowed",
  default: [],
});
