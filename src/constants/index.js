const about = {
  label: "About",
  header: "About this project - Notepad",
  desktopIcon: true,
  desktopPosition: 3,
  visibility: [false, false], // eg [button visible (show button), window visible (show window)]
};
const user = {
  label: "User Profiles",
  header: "Explore Users - Search Github for users",
  desktopIcon: true,
  desktopPosition: 1,
  visibility: [false, false],
};
const repos = {
  label: "Search Repos",
  header: "Search Repositories - Find the latest, hottest, and trending repos",
  desktopIcon: true,
  desktopPosition: 0,
  visibility: [false, false],
};
const trending = {
  label: "Trending Repos",
  header:
    '<img src="' +
    require("../assets/folder-open.png") +
    '" /> Exploring - Github\\Trending Repos',
  desktopIcon: true,
  desktopPosition: 2,
  visibility: [false, false],
};

// For testing - TODO remove
const facebookreact = {
  label: "Repo: facebook/react",
  header: "facebook react",
  desktopIcon: false,
  desktopPosition: null,
  visibility: [true, true], // true while working on feature
  // visibility: [false, false],
  details: { owner: "facebook", name: "react" },
};

export const WINDOW_OBJ = {
  about,
  user,
  repos,
  trending,
  facebookreact,
};

export const DEFAULT_WINDOW = {
  label: ">default<",
  header: "", // if empty, use label
  desktopIcon: false,
  visibility: [false, false],
};

// Used for recoil atom ids
export const USER = "user";
export const REPOS = "repos";

// copying the github api file tree structure for use in the trending window
export const TRENDING_TREE = [
  {
    name: "repositories",
    type: "tree",
    open: true, // my addition to have this tree open by default
    object: {
      entries: [
        {
          name: "daily",
          type: "blob",
        },
        {
          name: "weekly",
          type: "blob",
        },
        {
          name: "monthly",
          type: "blob",
        },
      ],
    },
  },
  {
    name: "developers",
    type: "tree",
    object: {
      entries: [
        {
          name: "daily",
          type: "blob",
        },
        {
          name: "weekly",
          type: "blob",
        },
        {
          name: "monthly",
          type: "blob",
        },
      ],
    },
  },
];
