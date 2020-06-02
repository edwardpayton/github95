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
  const refTabsList = React.useRef(new Set([]));
  const [isLoading, setLoading] = React.useState(false);

  const {
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserFollows,
  } = useGithubApi();

  React.useEffect(() => {
    if (searchInputValue.length) {
      setLoading(true);
      getUserProfile();
      refTabsList.current.clear();
    }
  }, [searchInputValue]);

  React.useEffect(() => {
    if (user.profile.login || user.profile.error) setLoading(false);
  }, [user]);

  const handleTabChange = (activeTab) => {
    if (refTabsList.current.has(activeTab) || activeTab === 0) return;

    switch (activeTab) {
      case 1: {
        refTabsList.current.add(1);
        return getUserRepos();
      }
      case 2: {
        refTabsList.current.add(2);
        return getUserStars();
      }
      case 3:
      case 4: {
        refTabsList.current.add(3).add(4);
        return getUserFollows();
      }
      default:
        return;
    }
  };

  const windowContent = () => {
    if (isLoading)
      return (
        <div
          className="flex justify-center items-center"
          style={{ minHeight: 100 }}
        >
          <Hourglass size={32} />
          <p>&nbsp;Finding user...</p>
        </div>
      );
    if (!isLoading && user.profile.error === "Not found")
      return <p>not found</p>;
    if (!isLoading && user.profile.login)
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
