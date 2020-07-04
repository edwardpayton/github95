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
  // visibility: [true, true], // true while working on feature
  visibility: [false, false],
};

const facebookreact = {
  label: "Repo: facebook/react",
  header: "facebook react",
  desktopIcon: false,
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
