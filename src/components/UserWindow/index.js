import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody, Hourglass } from "react95";
import { useRecoilValue } from "recoil";

import { userCurrentNum, usersListObj, userActivity } from "../../store";

import Toolbar from "./Toolbar";
import Overview from "./Overview";
import Repos from "./Repos";
import Stars from "./Stars";
import Followers from "./Followers";
import Following from "./Following";

import useGithubApi from "../../githubApi";
import formatBigNumber from "../../utilities/formatBigNumber";

import "./styles.scss";

export default function UserWindow() {
  const activity = useRecoilValue(userActivity);
  const userList = useRecoilValue(usersListObj);
  const currentUser = useRecoilValue(userCurrentNum);
  const refTabsList = React.useRef(new Set([]));
  const [isSearching, setSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const refLogin = React.useRef("");

  const { getUserRepos, getUserStars, getUserFollows } = useGithubApi();

  React.useEffect(() => {
    if (currentUser && userList[currentUser].login !== refLogin.current) {
      // Reset active tab & tabs list on user change
      refLogin.current = userList[currentUser].login;
      setActiveTab(0);
      refTabsList.current.clear();
    }
    // Stop showing spinner on load or error
    if (
      currentUser &&
      (userList[currentUser].login || userList[currentUser].error)
    )
      setSearching(false);
  }, [userList, currentUser]);

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
      <Toolbar />
      <div className="userWindow__content">
        <div className="userContent">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            className={`userContent__tabs${!currentUser ? " -disabled" : ""}`}
          >
            <Tab value={0} className="userContent__tab">
              <p>Overview</p>
            </Tab>
            <Tab value={1} className="userContent__tab">
              <p>
                Repositories
                <span
                  className={`badge -small ${
                    activeTab === 1 ? "-blue" : "-grey"
                  }`}
                >
                  {currentUser &&
                    userList[currentUser].repositories &&
                    formatBigNumber(
                      userList[currentUser].repositories.totalCount
                    )}
                </span>
              </p>
            </Tab>
            <Tab value={2} className="userContent__tab">
              <p>
                Stars
                <span
                  className={`badge -small ${
                    activeTab === 2 ? "-blue" : "-grey"
                  }`}
                >
                  {currentUser &&
                    userList[currentUser].starredRepositories &&
                    formatBigNumber(
                      userList[currentUser].starredRepositories.totalCount
                    )}
                </span>
              </p>
            </Tab>
            <Tab value={3} className="userContent__tab">
              <p>
                Followers
                <span
                  className={`badge -small ${
                    activeTab === 3 ? "-blue" : "-grey"
                  }`}
                >
                  {currentUser &&
                    userList[currentUser].followers &&
                    formatBigNumber(userList[currentUser].followers.totalCount)}
                </span>
              </p>
            </Tab>
            <Tab value={4} className="userContent__tab">
              <p>
                Following
                <span
                  className={`badge -small ${
                    activeTab === 4 ? "-blue" : "-grey"
                  }`}
                >
                  {currentUser &&
                    userList[currentUser].following &&
                    formatBigNumber(userList[currentUser].following.totalCount)}
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
            {!currentUser && (
              <div className="flex justify-center items-center userContent__intro">
                <p>Search for a user</p>
              </div>
            )}

            {currentUser && (
              <>
                <div
                  className="userContent__body"
                  style={{ display: activeTab === 0 ? "block" : "none" }}
                >
                  <Overview
                    profile={userList[currentUser]}
                    activity={activity}
                    contributions={userList[currentUser].contributions}
                  />
                </div>
                <div
                  className="userContent__body"
                  style={{ display: activeTab === 1 ? "block" : "none" }}
                >
                  <Repos repos={userList[currentUser].dataRepos} />
                </div>

                <div
                  className="userContent__body"
                  style={{ display: activeTab === 2 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <Stars stars={userList[currentUser].dataStars} />
                  </div>
                </div>

                <div
                  className="userContent__body"
                  style={{ display: activeTab === 3 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <Followers
                      followers={userList[currentUser].dataFollowers}
                    />
                  </div>
                </div>

                <div
                  className="userContent__body"
                  style={{ display: activeTab === 4 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <Following
                      following={userList[currentUser].dataFollowing}
                    />
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
