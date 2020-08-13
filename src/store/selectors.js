import { selector } from "recoil";
import { rateLimit, searchStatusOfType } from "./atoms";
import formatDate from "../utilities/formatDate";
import { REPOS } from "../constants";

export const apiLimit = selector({
  key: "apiLimit",
  get: ({ get }) => get(rateLimit),
  set: ({ set }, newValue) => {
    const { remaining, resetAt } = newValue;

    const formatted = formatDate(resetAt, {
      time: true,
      month: false,
      year: false,
    });

    const formattedSplit = formatted.split(", ");

    const valueDate = formattedSplit[0].split("/")[0];
    const todaysDate = new Date().getDate();

    let resetDay = Number(valueDate) === todaysDate ? "" : " tomorrow";

    const value = {
      ...remaining,
      resetAt: `${formattedSplit[1]}${resetDay}`,
      exceeded: Number(formattedSplit[1]) === 0,
    };

    set(rateLimit, value);
  },
});

const initialRepoSearchStatus = {
  gettingSearch: false,
  gettingTopic: false,
  gettingPage: false,
  errors: false,
};

export const repoSearchStatus = selector({
  key: "repoSearchStatus",
  get: ({ get }) => get(searchStatusOfType(REPOS, initialRepoSearchStatus)),
  set: ({ set, get }, updates) => {
    const state = get(searchStatusOfType(REPOS));
    const newValue = {
      ...state,
      ...updates,
    };
    set(searchStatusOfType(REPOS), newValue);
  },
});
