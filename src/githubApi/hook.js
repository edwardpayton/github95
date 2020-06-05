import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  userSearchInput,
  userSearchMatches,
  usersListObj,
  userCurrentNum,
} from "../store";
import {
  apiGetUsersMatches,
  apiGetUserProfile,
  apiGetUserActivity,
  apiGetUserRepos,
  apiGetUserStars,
  apiGetUserFollows,
} from "./api";

/**
 * useGithubApi hook
 * returns getUserProfile, getUserRepos, getUserStars, & getUserFollows functions to access the api data
 * example: const { userProfile, userRepos, getUserStars, getUserFollows } = useGithubApi();
 */
export default function useGithubApi() {
  const firstCallRef = React.useRef(false);
  const setMatches = useSetRecoilState(userSearchMatches);
  const [currentUser, setCurrentUser] = useRecoilState(userCurrentNum);
  const [userList, setList] = useRecoilState(usersListObj);
  const searchInput = useRecoilValue(userSearchInput);

  const getUserActivity = React.useCallback(async () => {
    const dataActivity = await apiGetUserActivity(
      searchInput,
      userList[currentUser].repositories.totalCount
    );
    if (dataActivity instanceof Error) {
      console.error("ERROR", dataActivity); // TODO
    }
    const newUserData = {
      [userList[currentUser].login]: {
        ...userList[currentUser],
        dataActivity,
      },
    };

    setList({ ...userList, ...newUserData });
  }, [searchInput, userList, setList, currentUser]);

  React.useEffect(() => {
    // TODO this logic doesnt work. doesnt trigger on username change
    if (firstCallRef.current) getUserActivity();
  }, [firstCallRef.current]); //eslint-disable-line react-hooks/exhaustive-deps

  //

  const getUsersMatches = React.useCallback(
    async (input) => {
      const matches = await apiGetUsersMatches(input);
      if (!matches || matches instanceof Error) {
        console.error("ERROR", matches); // TODO
      }
      setMatches(matches);
    },
    [setMatches]
  );

  const getUserProfile = React.useCallback(
    async (input) => {
      const profile = await apiGetUserProfile(input);
      if (profile instanceof Error) {
        console.error("ERROR", profile); // TODO
      }
      const newUserData = {
        [profile.login]: profile,
      };

      setCurrentUser(profile.login);
      setList({ ...userList, ...newUserData });
      firstCallRef.current = true;
    },
    [userList, setList, setCurrentUser]
  );

  const getUserRepos = React.useCallback(async () => {
    const dataRepos = await apiGetUserRepos(userList[currentUser].login);
    const newUserData = {
      [userList[currentUser].login]: {
        ...userList[currentUser],
        dataRepos,
      },
    };

    setList({ ...userList, ...newUserData });
  }, [userList, setList, currentUser]);

  const getUserStars = React.useCallback(async () => {
    const dataStars = await apiGetUserStars(userList[currentUser].login);
    const newUserData = {
      [userList[currentUser].login]: {
        ...userList[currentUser],
        dataStars,
      },
    };
    setList({ ...userList, ...newUserData });
  }, [userList, setList, currentUser]);

  const getUserFollows = React.useCallback(async () => {
    const result = await apiGetUserFollows(userList[currentUser].login);
    const newUserData = {
      [userList[currentUser].login]: {
        ...userList[currentUser],
        dataFollowers: result["followers"],
        dataFollowing: result["following"],
      },
    };
    setList({ ...userList, ...newUserData });
  }, [userList, setList, currentUser]);

  return {
    getUsersMatches,
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserFollows,
  };
}
