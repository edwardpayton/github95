import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { userData, searchInput } from "../store";
import {
  apiGetUserProfile,
  apiGetUserActivity,
  apiGetUserRepos,
  apiGetUserStars,
  apiGetUserFollows,
} from "./api";

import { USER_OBJ } from "../constants";

/**
 * useGithubApi hook
 * returns getUserProfile, getUserRepos, getUserStars, & getUserFollows functions to access the api data
 * example: const { userProfile, userRepos, getUserStars, getUserFollows } = useGithubApi();
 */
export default function useGithubApi() {
  const firstCallRef = React.useRef(false);
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const getUserActivity = React.useCallback(async () => {
    const activity = await apiGetUserActivity(
      searchInputValue,
      user.profile.repositories.totalCount
    );
    if (activity instanceof Error) {
      console.error("ERROR", activity); // TODO
    }

    let newUserData = { ...user, activity };
    setUser(newUserData);
  }, [searchInputValue, user, setUser]);

  React.useEffect(() => {
    // TODO this logic doesnt work. doesnt trigger on username change
    if (firstCallRef.current) getUserActivity();
  }, [firstCallRef.current]);

  const getUserProfile = React.useCallback(async () => {
    const profile = await apiGetUserProfile(searchInputValue);
    if (profile instanceof Error) {
      console.error("ERROR", profile); // TODO
    }

    let newUserData = { ...USER_OBJ, profile };
    setUser(newUserData);
    firstCallRef.current = true;
  }, [searchInputValue, user, setUser]);

  const getUserRepos = React.useCallback(async () => {
    const result = await apiGetUserRepos(user.profile["login"]);
    const newUserData = { ...user, repos: result };
    setUser(newUserData);
  }, [user, setUser]);

  const getUserStars = React.useCallback(async () => {
    const result = await apiGetUserStars(user.profile["login"]);
    const newUserData = { ...user, stars: result };
    setUser(newUserData);
  }, [user, setUser]);

  const getUserFollows = React.useCallback(async () => {
    const result = await apiGetUserFollows(user.profile["login"]);
    const newUserData = {
      ...user,
      followers: result["followers"],
      following: result["following"],
    };
    setUser(newUserData);
  }, [user, setUser]);

  return {
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserFollows,
  };
}
