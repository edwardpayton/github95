import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  searchInputOfType,
  searchResultsOfType,
  usersListObj,
  userCurrentNum,
} from "../store";
import { apiGetRepoSearchResults } from "./api";
import { REPOS } from "../constants";

export default function useReposApi() {
  const setResults = useSetRecoilState(searchResultsOfType(REPOS));
  const searchInput = useRecoilValue(searchInputOfType(REPOS));

  const getRepoSearchResults = React.useCallback(async (input) => {
    console.log("~/Sites/github95/src/githubApi/hookRepos >>>", input);
    const results = await apiGetRepoSearchResults(input);
    if (!results || results instanceof Error) {
      console.error("ERROR", results); // TODO
    }
    setResults(results);
  }, []);

  return {
    getRepoSearchResults,
  };
}
