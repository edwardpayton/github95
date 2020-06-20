import React from "react";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// import {
//   userSearchInput,
//   userSearchResults,
//   usersListObj,
//   userCurrentNum,
// } from "../store";
// import {
//   apiGetUserSearchResults,
//   apiGetUserProfile,
//   apiGetUserActivity,
//   apiGetUserRepos,
//   apiGetUserStars,
//   apiGetUserGists,
//   apiGetUserFollows,
// } from "./api";

export default function useReposApi() {
  const getRepoSearchResults = React.useCallback(async () => {
    console.log("~/Sites/github95/src/githubApi/hookRepos >>>");
  }, []);

  return {
    getRepoSearchResults,
  };
}
