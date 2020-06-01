import React from "react";
import { useRecoilValue } from "recoil";
import { Hourglass } from "react95";

import { userData, userActivity, searchInput } from "../store";

import SearchInput from "./SearchInput";
import UserContent from "./UserContent";

import useGithubApi from "../githubApi";

// import formatApiContributions from "../utilities/formatApiContributions";

export default function UserWindow() {
  const user = useRecoilValue(userData);
  const activity = useRecoilValue(userActivity);
  const searchInputValue = useRecoilValue(searchInput);

  const {
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserFollows,
  } = useGithubApi();

  React.useEffect(() => {
    if (searchInputValue.length) {
      getUserProfile();
    }
  }, [searchInputValue]);

  const handleTabChange = (activeTab) => {
    if (activeTab === 1 && !user.repos.length) {
      getUserRepos();
    }
    if (activeTab === 2 && !user.stars.length) {
      getUserStars();
    }
    if (
      (activeTab === 3 && !user.followers.length) ||
      (activeTab === 4 && !user.following.length)
    ) {
      getUserFollows();
    }
  };

  const windowContent = () => {
    if (!user.profile.name)
      return (
        <div
          className="flex justify-center items-center"
          style={{ minHeight: 100 }}
        >
          <Hourglass size={32} />
          <p>&nbsp;Finding user...</p>
        </div>
      );
    if (user.profile.error === "Not found") return <p>not found</p>;
    if (user.profile.name) {
      return (
        <UserContent
          profile={user.profile}
          //contributions={formatApiContributions(user.activity.contributions)}
          contributions={undefined}
          activity={activity}
          repos={user.repos}
          stars={user.stars}
          followers={user.followers}
          following={user.following}
          onTabChange={handleTabChange}
        />
      );
    }
    return (
      <div
        className="flex justify-center items-center"
        style={{ minHeight: 100 }}
      >
        <p>Search for a user</p>
      </div>
    );
  };

  return (
    <>
      <div className="flex userWindow__search">
        <p style={{ paddingLeft: 5, width: 60, lineHeight: "14px" }}>
          Search username
        </p>
        <SearchInput />
      </div>
      <div className="userWindow__content">{windowContent()}</div>
    </>
  );
}
