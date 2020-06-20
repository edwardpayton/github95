import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  userSearchInput,
  userSearchResults,
  usersListObj,
  userCurrentNum,
} from "../store";
import {
  apiGetUserSearchResults,
  apiGetUserProfile,
  apiGetUserActivity,
  apiGetUserRepos,
  apiGetUserStars,
  apiGetUserGists,
  apiGetUserFollows,
} from "./api";

/**
 * Github api hook
 * returns getUserProfile, getUserRepos, getUserStars, getUserGists, & getUserFollows functions to access the api data
 * example: const { userProfile, userRepos, getUserStars, getUserGists, getUserFollows } = githubApi();
 */
export default function useUserApi() {
  const firstCallRef = React.useRef(false);
  const setResults = useSetRecoilState(userSearchResults);
  const [currentUser, setCurrentUser] = useRecoilState(userCurrentNum);
  const [userList, setList] = useRecoilState(usersListObj);
  const searchInput = useRecoilValue(userSearchInput);

  const getUserActivity = React.useCallback(async () => {
    const activity = await apiGetUserActivity(
      searchInput,
      userList[currentUser].repositories.totalCount
    );
    if (activity instanceof Error) {
      console.error("ERROR", activity); // TODO
    }
    const existingData = userList[userList[currentUser].login]["apiData"];
    const newUserData = {
      [userList[currentUser].login]: {
        ...userList[currentUser],
        apiData: {
          ...existingData,
          activity,
        },
      },
    };

    setList({ ...userList, ...newUserData });
  }, [searchInput, userList, setList, currentUser]);

  React.useEffect(() => {
    // TODO this logic doesnt work. doesnt trigger on username change
    if (firstCallRef.current) getUserActivity();
  }, [firstCallRef.current]); //eslint-disable-line react-hooks/exhaustive-deps

  //

  const getUserSearchResults = React.useCallback(
    async (input) => {
      const results = await apiGetUserSearchResults(input);
      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }
      setResults(results);
    },
    [setResults]
  );

  const getUserProfile = React.useCallback(
    async (input) => {
      let profile = await apiGetUserProfile(input);
      if (profile instanceof Error) {
        console.error("ERROR", profile); // TODO
      }

      profile = {
        ...profile,
        apiData: {},
      };
      const newUserData = {
        [profile.login]: profile,
      };

      setCurrentUser(profile.login);
      setList({ ...userList, ...newUserData });
      firstCallRef.current = true;
    },
    [userList, setList, setCurrentUser]
  );

  const getUserRepos = React.useCallback(
    async (cursor = null) => {
      let repos = await apiGetUserRepos(userList[currentUser].login, cursor);

      if (cursor) {
        // if cursor, add new results to old (new results first)
        repos = [
          ...repos,
          ...userList[userList[currentUser].login].apiData.repos,
        ];
      }
      const existingData = userList[userList[currentUser].login]["apiData"];
      const newUserData = {
        [userList[currentUser].login]: {
          ...userList[currentUser],
          apiData: {
            ...existingData,
            repos,
          },
        },
      };

      setList({ ...userList, ...newUserData });
    },
    [userList, setList, currentUser]
  );

  const getUserStars = React.useCallback(
    async (cursor = null) => {
      let stars = await apiGetUserStars(userList[currentUser].login, cursor);

      if (cursor) {
        // if cursor, add new results to old (new results first)
        stars = [
          // TODO fix TS error 'Type 'any[] | Error' must have a '[Symbol.iterator]()' method that returns an iterator.'
          // @ts-ignore.
          ...stars,
          ...userList[userList[currentUser].login].apiData.stars,
        ];
      }
      const existingData = userList[userList[currentUser].login]["apiData"];
      const newUserData = {
        [userList[currentUser].login]: {
          ...userList[currentUser],
          apiData: {
            ...existingData,
            stars,
          },
        },
      };
      setList({ ...userList, ...newUserData });
    },
    [userList, setList, currentUser]
  );

  const getUserGists = React.useCallback(
    async (cursor = null) => {
      let gists = await apiGetUserGists(userList[currentUser].login, cursor);

      if (cursor) {
        // if cursor, add new results to old (new results first)
        gists = [
          ...gists,
          ...userList[userList[currentUser].login].apiData.gists,
        ];
      }
      const existingData = userList[userList[currentUser].login]["apiData"];
      const newUserData = {
        [userList[currentUser].login]: {
          ...userList[currentUser],
          apiData: {
            ...existingData,
            gists,
          },
        },
      };
      setList({ ...userList, ...newUserData });
    },
    [userList, setList, currentUser]
  );

  const getUserFollows = React.useCallback(async () => {
    const result = await apiGetUserFollows(userList[currentUser].login);
    const existingData = userList[userList[currentUser].login]["apiData"];
    const newUserData = {
      [userList[currentUser].login]: {
        ...userList[currentUser],
        apiData: {
          ...existingData,
          followers: result["followers"],
          following: result["following"],
        },
      },
    };
    setList({ ...userList, ...newUserData });
  }, [userList, setList, currentUser]);

  return {
    getUserSearchResults,
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserGists,
    getUserFollows,
  };
}
