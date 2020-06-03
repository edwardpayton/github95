import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody, Hourglass } from "react95";
import { useRecoilValue, useRecoilState } from "recoil";

import { userData, userActivity, searchInput } from "../../store";

import SearchInput from "../SearchInput";
import Overview from "./Overview";
import Repos from "./Repos";
import Stars from "./Stars";
import Followers from "./Followers";
import Following from "./Following";

import useGithubApi from "../../githubApi";

import "./styles.scss";

export default function UserWindow() {
  const user = useRecoilValue(userData);
  const activity = useRecoilValue(userActivity);
  const [input, setInput] = useRecoilState(searchInput);
  const refTabsList = React.useRef(new Set([]));
  const [isSearching, setSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const {
    getUserProfile,
    getUserRepos,
    getUserStars,
    getUserFollows,
  } = useGithubApi();

  React.useEffect(() => {
    if (input.length) {
      setSearching(true);
      getUserProfile();
      refTabsList.current.clear();
    }
  }, [input]);

  React.useEffect(() => {
    if (user.profile.login || user.profile.error) setSearching(false);
  }, [user]);

  const handleSearch = (value) => {
    setInput(value);
  };

  const handleChange = (value) => {
    setActiveTab(value);
    handleTabChange(value);
  };

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

  return (
    <>
      <div className="flex userWindow__search">
        <SearchInput
          labelText="Username"
          placeholder="eg: edwardpayton"
          defaultValue={input}
          onSearch={handleSearch}
        />
      </div>
      <div className="userWindow__content">
        <div className="userContent">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            className={`userContent__tabs${
              !user.profile.login ? " -disabled" : ""
            }`}
          >
            <Tab value={0} className="userContent__tab">
              <p>Overview</p>
            </Tab>
            <Tab value={1} className="userContent__tab">
              <p>
                Repositories
                <span
                  className={`badge ${activeTab === 1 ? "-blue" : "-grey"}`}
                >
                  {user.profile.repositories &&
                    user.profile.repositories.totalCount}
                </span>
              </p>
            </Tab>
            <Tab value={2} className="userContent__tab">
              <p>
                Stars
                <span
                  className={`badge ${activeTab === 2 ? "-blue" : "-grey"}`}
                >
                  {user.profile.starredRepositories &&
                    user.profile.starredRepositories.totalCount}
                </span>
              </p>
            </Tab>
            <Tab value={3} className="userContent__tab">
              <p>
                Followers
                <span
                  className={`badge ${activeTab === 3 ? "-blue" : "-grey"}`}
                >
                  {user.profile.followers && user.profile.followers.totalCount}
                </span>
              </p>
            </Tab>
            <Tab value={4} className="userContent__tab">
              <p>
                Following
                <span
                  className={`badge ${activeTab === 4 ? "-blue" : "-grey"}`}
                >
                  {user.profile.following && user.profile.following.totalCount}
                </span>
              </p>
            </Tab>
          </Tabs>

          <TabBody className="userContent__tabBody">
            {isSearching && (
              <div className="flex justify-center items-center card userWindow__hourglass">
                <Hourglass size={32} />
                <p>&nbsp;Finding user...</p>
              </div>
            )}
            {!user.profile.login && !user.profile.error && (
              <div
                className="flex justify-center items-center"
                style={{ minHeight: 100 }}
              >
                <p>Search for a user</p>
              </div>
            )}
            {!isSearching && user.profile.error === "Not found" && (
              <p>Not found</p>
            )}

            {user.profile.login && (
              <>
                <div
                  className="userContent__body"
                  style={{ display: activeTab === 0 ? "block" : "none" }}
                >
                  <Overview
                    profile={user.profile}
                    activity={activity}
                    contributions={user.contributions}
                  />
                </div>
                <div
                  className="userContent__body"
                  style={{ display: activeTab === 1 ? "block" : "none" }}
                >
                  <Repos repos={user.repos} />
                </div>

                <div
                  className="userContent__body"
                  style={{ display: activeTab === 2 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <Stars stars={user.stars} />
                  </div>
                </div>

                <div
                  className="userContent__body"
                  style={{ display: activeTab === 3 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <Followers followers={user.followers} />
                  </div>
                </div>

                <div
                  className="userContent__body"
                  style={{ display: activeTab === 4 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <Following following={user.following} />
                  </div>
                </div>
              </>
            )}
          </TabBody>
        </div>
      </div>
    </>
  );
}
