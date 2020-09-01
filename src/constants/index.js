const welcome = {
  label: "Welcome",
  header: "Welcome to Github95",
  desktopIcon: "",
  desktopPosition: null,
  visibility: [true, true], // eg [button visible (show button), window visible (show window)]
};
const user = {
  label: "Find Users",
  header: "Find Users - Search Github for users",
  desktopIcon: require(`../assets/user.png`),
  desktopPosition: 1,
  visibility: [false, false],
};
const repos = {
  label: "Repositories",
  header:
    "Search Repositories - Find the latest, most starred, best reposirotories",
  desktopIcon: require(`../assets/search-computer.png`),
  desktopPosition: 0,
  visibility: [false, false],
};
const trending = {
  label: "Trending Repos",
  header:
    '<img src="' +
    require("../assets/folder-open.png") +
    '" /> Exploring - Github\\Trending Repos',
  desktopIcon: require(`../assets/folder-closed.png`),
  desktopPosition: 2,
  visibility: [false, false],
};
const mostFollowed = {
  label: "Most Followed Repos",
  header:
    '<img src="' +
    require("../assets/folder-open.png") +
    '" /> Exploring - Github\\Most Followed Repos',
  desktopIcon: require(`../assets/folder-closed.png`),
  desktopPosition: 3,
  visibility: [false, false],
};
const about = {
  label: "About",
  header: "Notepad - About Github95.txt",
  desktopIcon: require(`../assets/wordpad.png`),
  desktopPosition: 4,
  visibility: [false, false],
};

export const WINDOW_OBJ = {
  welcome,
  about,
  user,
  repos,
  trending,
  mostFollowed,
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
