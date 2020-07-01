const about = {
  label: "About",
  header: "About this project",
  desktopIcon: true,
  visibility: [false, false], // eg [button visible (show button), window visible (show window)]
};
const user = {
  label: "Explore Users",
  header: "Explore Users - Search Github for users",
  desktopIcon: true,
  visibility: [false, false],
};
const repos = {
  label: "Repositories",
  header: "Search Repositories - Find the latest, hottest, and trending repos",
  desktopIcon: true,
  visibility: [true, true], //[false, false], // true while working on feature
};

export const WINDOW_OBJ = {
  about,
  user,
  repos,
};

export const DEFAULT_WINDOW = {
  label: ">default<",
  header: "", // if empty, use icon
  desktopIcon: false,
  visibility: [false, false],
};

// Used for recoil atom ids
export const USER = "user";
export const REPOS = "repos";
