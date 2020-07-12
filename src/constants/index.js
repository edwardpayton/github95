const about = {
  label: "About",
  header: "About this project",
  desktopIcon: true,
  desktopPosition: 2,
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
  // visibility: [true, true], // true while working on feature
  visibility: [false, false],
};

// For testing - TODO remove
const facebookreact = {
  label: "Repo: facebook/react",
  header: "facebook react",
  desktopIcon: false,
  desktopPosition: null,
  visibility: [true, true],
  details: { owner: "facebook", name: "react" },
};

export const WINDOW_OBJ = {
  about,
  user,
  repos,
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
