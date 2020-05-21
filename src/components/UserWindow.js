import React from "react";
import { useRecoilValue } from "recoil";

import { userData, searchInput } from "../store";

import SearchInput from "./SearchInput";
import UserContent from "./UserContent";

import useGithubApi from "../githubApi";

export default function UserWindow() {
  const user = useRecoilValue(userData);
  const searchInputValue = useRecoilValue(searchInput);

  const { userProfile } = useGithubApi();

  React.useEffect(() => {
    searchInputValue.length && userProfile();
  }, [searchInputValue]);

  React.useEffect(() => {
    console.log("~/Sites/github95/src/components/UserWindow >>>", user);
  }, [user]);

  const handleTabChange = (activeTab) => {
    // if (activeTab === 2 && !user.repos.length) {
    //   getRepos();
    // }
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
