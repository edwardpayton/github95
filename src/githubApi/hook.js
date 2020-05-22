import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { userData, searchInput } from "../store";
import reducer from "./reducer";
import { apiGetUserProfile, apiGetUserActivity, apiGetUserRepos } from "./api";

/**
 * useGithubApi hook
 * returns userProfile & userRepos, functions to access the api data
 * example: const { userProfile, userRepos } = useGithubApi();
 */
export default function useGithubApi() {
  const [{ hasData, isLoading, hasErrored }, dispatch] = reducer();
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const getUserActivity = React.useCallback(async () => {
    dispatch({ type: "LOADING" });
    const activity = await apiGetUserActivity(
      searchInputValue,
      user.profile.repositories.totalCount
    );
    if (activity instanceof Error) {
      dispatch({ type: "ERROR" });
      console.error("ERROR", activity); // TODO
    }

    let newUserData = { ...user, activity };
    setUser(newUserData);
    dispatch({ type: "SUCCESS" });
  }, [searchInputValue, user, setUser]);

  React.useEffect(() => {
    if (hasData) getUserActivity();
  }, [hasData]);

  const getUserProfile = React.useCallback(async () => {
    dispatch({ type: "LOADING" });
    const profile = await apiGetUserProfile(searchInputValue);
    if (profile instanceof Error) {
      dispatch({ type: "ERROR" });
      console.error("ERROR", profile); // TODO
    }

    let newUserData = { ...user, profile };
    setUser(newUserData);
    dispatch({ type: "SUCCESS" });
  }, [searchInputValue, user, setUser]);

  const getUserRepos = React.useCallback(async () => {
    const result = await apiGetUserRepos(user.profile["login"]);
    const newUserData = { ...user, repos: result };
    setUser(newUserData);
  }, [user, setUser]);

  return [
    isLoading,
    hasErrored,
    {
      getUserProfile,
      getUserRepos,
    },
  ];
}
