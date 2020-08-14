import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  userApiStatus,
  searchInputOfType,
  searchResultsOfType,
  usersListObj,
  userChartData,
  userEventsData,
  currentRecordOfType,
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
import { apiGetUserEvents } from "./api.v3";
import { USER } from "../constants";

import processChartData from "../utilities/processChartData";

/**
 * Github api hook
 * returns getUserProfile, getUserRepos, getUserStars, getUserGists, & getUserFollows functions to access the api data
 * example: const { userProfile, userRepos, getUserStars, getUserGists, getUserFollows } = githubApi();
 */
export default function useUserApi() {
  const setApiState = useSetRecoilState(userApiStatus);
  const setResults = useSetRecoilState(searchResultsOfType(USER));
  const [currentUser, setCurrentUser] = useRecoilState(
    currentRecordOfType(USER)
  );
  const [userList, setList] = useRecoilState(usersListObj);
  const searchInput = useRecoilValue(searchInputOfType(USER));
  const [chartData, setChartData] = useRecoilState(userChartData);
  const [events, setEvents] = useRecoilState(userEventsData);

  const getUserSearchResults = React.useCallback(
    async (input) => {
      setApiState({ searching: true });
      const results = await apiGetUserSearchResults(input);
      if (!results || results instanceof Error) {
        setApiState({ searching: false, errors: results }); // TODO what to do with this?
      }
      setApiState({ searching: false });
      setResults(results);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setResults]
    // 'setApiState' - not needed
  );

  const getUserProfile = React.useCallback(
    async (input) => {
      if (!input.length) {
        return;
      }
      setApiState({ gettingUser: true });
      let profile = await apiGetUserProfile(input);
      if (profile instanceof Error) {
        setApiState({ gettingUser: false, errors: profile }); // TODO what to do with this?
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
      setApiState({ gettingUser: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userList, setList, setCurrentUser]
    // 'setApiState' - not needed
  );

  const getUserActivity = React.useCallback(async () => {
    const activity = await apiGetUserActivity(
      searchInput,
      userList[currentUser].repositories.totalCount
    );
    if (activity instanceof Error) {
      console.error("ERROR", activity); // TODO
    }

    const userChartData = processChartData(activity);

    setChartData({ ...chartData, [currentUser]: userChartData });
  }, [searchInput, userList, currentUser, chartData, setChartData]);

  const getUserEvents = React.useCallback(async () => {
    const respEvents = await apiGetUserEvents(currentUser);

    setEvents({ ...events, [currentUser]: respEvents });
  }, [currentUser, events, setEvents]);

  const getUserRepos = React.useCallback(
    async (cursor = null) => {
      setApiState({ gettingPage: true });
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
      setApiState({ gettingPage: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userList, setList, currentUser]
    // 'setApiState' - not needed
  );

  const getUserStars = React.useCallback(
    async (cursor = null) => {
      setApiState({ gettingPage: true });
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
      setApiState({ gettingPage: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userList, setList, currentUser]
    // 'setApiState' - not needed
  );

  const getUserGists = React.useCallback(
    async (cursor = null) => {
      setApiState({ gettingPage: true });
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
      setApiState({ gettingPage: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userList, setList, currentUser]
    // 'setApiState' - not needed
  );

  const getUserFollows = React.useCallback(async () => {
    setApiState({ gettingPage: true });
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
    setApiState({ gettingPage: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList, setList, currentUser]);
  // 'setApiState' - not needed

  return {
    getUserSearchResults,
    getUserProfile,
    getUserActivity,
    getUserEvents,
    getUserRepos,
    getUserStars,
    getUserGists,
    getUserFollows,
  };
}
