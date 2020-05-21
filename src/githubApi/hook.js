import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { userData, searchInput } from "../store";

import { getUserProfile, getUserActivity, getUserRepos } from "./api";

export default function useGithubApi() {
  const [userloaded, setUserloaded] = React.useState(false);
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const userActivity = React.useCallback(async () => {
    const activity = await getUserActivity(
      searchInputValue,
      user.profile.repositories.totalCount
    );

    let newUserData = { ...user, activity };
    setUser(newUserData);
  }, [searchInputValue, user, setUser]);

  React.useEffect(() => {
    if (userloaded) userActivity();
  }, [userloaded]);

  const userProfile = React.useCallback(async () => {
    const profile = await getUserProfile(searchInputValue);
    if (profile instanceof Error) {
      console.error("ERROR", profile);
    }

    let newUserData = { ...user, profile };
    setUser(newUserData);
    setUserloaded(true);
  }, [searchInputValue, user, setUser]);

  const userRepos = React.useCallback(async () => {
    const result = await getUserRepos(user.profile["login"]);
    const newUserData = { ...user, repos: result };
    setUser(newUserData);
  }, [user, setUser]);

  return {
    userProfile,
    userRepos,
  };
}
