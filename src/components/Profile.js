import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData, searchInput } from "../store";

import SearchInput from "./SearchInput";
import ProfileContent from "./ProfileContent";

import { getUserApi, getUserReposApi } from "../data/githubApiNew";

export default function Profile() {
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const _getUser = React.useCallback(async () => {
    const result = await getUserApi(searchInputValue);
    if (result instanceof Error) {
      console.error("ERROR", result);
    }
    const newUserData = { ...user, profile: result };
    setUser(newUserData);
  }, [searchInputValue]);

  const getRepos = React.useCallback(async () => {
    const result = await getUserReposApi(user.profile["login"]);
    const newUserData = { ...user, repos: result };
    setUser(newUserData);
  }, [user]);

  React.useEffect(() => {
    searchInputValue.length && _getUser();
  }, [searchInputValue]);

  const handleTabChange = (activeTab) => {
    if (activeTab === 2 && !user.repos.length) {
      getRepos();
    }
  };

  return (
    <>
      <SearchInput />
      {user && user.profile["name"] ? (
        <ProfileContent user={user.profile} onTabChange={handleTabChange} />
      ) : (
        <p>Not found</p>
      )}
    </>
  );
}
