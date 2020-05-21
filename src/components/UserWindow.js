import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { userData, searchInput } from "../store";

import SearchInput from "./SearchInput";
import UserContent from "./UserContent";

import { getUserProfile, getUserRepos } from "../githubApi";

export default function UserWindow() {
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const getUser = React.useCallback(async () => {
    const result = await getUserProfile(searchInputValue);
    if (result instanceof Error) {
      console.error("ERROR", result);
    }
    const newUserData = { ...user, profile: result };
    setUser(newUserData);
  }, [searchInputValue]);

  const getRepos = React.useCallback(async () => {
    const result = await getUserRepos(user.profile["login"]);
    const newUserData = { ...user, repos: result };
    setUser(newUserData);
  }, [user]);

  React.useEffect(() => {
    searchInputValue.length && getUser();
  }, [searchInputValue]);

  const handleTabChange = (activeTab) => {
    if (activeTab === 2 && !user.repos.length) {
      getRepos();
    }
  };

  return (
    <>
      <div className="flex profileSearch">
        <p style={{ paddingLeft: 5, width: 60, lineHeight: "14px" }}>
          Search username
        </p>
        <SearchInput />
      </div>
      {user && user.profile["name"] ? (
        <UserContent user={user.profile} onTabChange={handleTabChange} />
      ) : (
        <p>Not found</p>
      )}
    </>
  );
}
