import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { userData, userSearchInput, userSearchMatches } from "../store";
import {
  apiGetUsersMatches,
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
  const setMatches = useSetRecoilState(userSearchMatches);
  const [user, setUser] = useRecoilState(userData);
  const searchInput = useRecoilValue(userSearchInput);

  const getUserActivity = React.useCallback(async () => {
    const activity = await apiGetUserActivity(
      searchInput,
      user.profile.repositories.totalCount
    );
    if (activity instanceof Error) {
      console.error("ERROR", activity); // TODO
    }

    let newUserData = { ...user, activity };
    setUser(newUserData);
  }, [searchInput, user, setUser]);

  React.useEffect(() => {
    // TODO this logic doesnt work. doesnt trigger on username change
    if (firstCallRef.current) getUserActivity();
  }, [firstCallRef.current]);

  const getUsersMatches = React.useCallback(
    async (input) => {
      const matches = await apiGetUsersMatches(input);
      if (!matches || matches instanceof Error) {
        console.error("ERROR", matches); // TODO
      }
      setMatches(matches);
    },
    [searchInput, user, setUser]
  );

  const getUserProfile = React.useCallback(
    async (input) => {
      const profile = await apiGetUserProfile(input);
      if (profile instanceof Error) {
        console.error("ERROR", profile); // TODO
      }

      let newUserData = { ...USER_OBJ, profile };
      setUser(newUserData);
      firstCallRef.current = true;
    },
    [searchInput, user, setUser]
  );

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
    getUsersMatches,
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserFollows,
  };
}
