const defaultWindow = {
  label: ">default<",
  header: "", // if empty, use icon
  size: null,
  visibility: [false, false], // [ button visible (show button), window visible (show window) ]
};
const about = {
  label: "About",
  header: "About this project",
  visibility: [false, false],
};
const user = {
  label: "Explore Users",
  header: "Explore Users - Search Github for users",
  visibility: [false, false],
};
const repos = {
  label: "Repositories",
  header: "Search Repositories - Find the latest, hottest, and trending repos",
  visibility: [true, true], //[false, false], // true while working on feature
};

export const WINDOW_OBJ = {
  about,
  user,
  repos,
};

// Used for recoil atom ids
export const USER = "user";
export const REPOS = "repos";
