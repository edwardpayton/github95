import React from "react";
import { Tabs, Tab, TabBody } from "react95";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import Loading from "../../components/Loading";
import Header from "./Header";
import TabOverview from "./TabOverview";
import TabRepos from "./TabRepos";
import TabStars from "./TabStars";
import TabFollowers from "./TabFollowers";
import TabFollowing from "./TabFollowing";
import TabGists from "./TabGists";

import {
  userApiStatus,
  currentRecordOfType,
  searchInputOfType,
  usersListObj,
  windowObj,
} from "../../store";
import { useUserApi } from "../../githubApi";
import { USER } from "../../constants";
import formatBigNumber from "../../utilities/formatBigNumber";

import "./styles.scss";

export default function UserWindow() {
  const [currentUser, setCurrentUser] = useRecoilState(
    currentRecordOfType(USER)
  );
  const setInput = useSetRecoilState(searchInputOfType(USER));
  const userList = useRecoilValue(usersListObj);
  const currentWindows = useRecoilValue(windowObj);
  const { gettingUser } = useRecoilValue(userApiStatus);
  const refTabsList = React.useRef(new Set([]));
  const [activeTab, setActiveTab] = React.useState(0);
  const refLogin = React.useRef("");

  const {
    getUserActivity,
    getUserRepos,
    getUserStars,
    getUserGists,
    getUserFollows,
  } = useUserApi();

  React.useEffect(() => {
    if (currentUser && userList[currentUser].login !== refLogin.current) {
      // Reset active tab & tabs list on user change
      getUserActivity();
      refLogin.current = userList[currentUser].login;
      setActiveTab(0);
      refTabsList.current.clear();
    }
  }, [userList, currentUser]);

  React.useEffect(() => {
    if (currentUser && !currentWindows.user.visibility[0]) {
      // Clear active user on window close
      refLogin.current = "";
      setActiveTab(0);
      refTabsList.current.clear();
      setCurrentUser(null);
      setInput("");
    }
  }, [currentWindows.user]);

  const handleChange = (_, value) => {
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
      case 5: {
        refTabsList.current.add(5);
        return getUserGists();
      }
      default:
        return;
    }
  };

  const handleReposPagination = () => {
    getUserRepos(userList[currentUser].apiData.repos[0].cursor);
  };

  const handleStarsPagination = () => {
    getUserStars(userList[currentUser].apiData.stars[0].cursor);
  };

  const handleGistsPagination = () => {
    getUserGists(userList[currentUser].apiData.gists[0].cursor);
  };

  return (
    <div className="flex flex-column userWindow">
      <Header />
      <section className="userWindow__content">
        <div className="flex flex-column userContent">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            className={`tabs userContent__tabs${
              !currentUser ? " -disabled" : ""
            }`}
          >
            <Tab value={0} className="tabs__tab userContent__tab">
              <p>Overview</p>
            </Tab>
            <Tab value={1} className="tabs__tab userContent__tab">
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
            <Tab value={2} className="tabs__tab userContent__tab">
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
            <Tab value={3} className="tabs__tab userContent__tab">
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
            <Tab value={4} className="tabs__tab userContent__tab">
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
            <Tab value={5} className="tabs__tab userContent__tab">
              <p>
                Gists
                <span
                  className={`badge -small ${
                    activeTab === 5 ? "-blue" : "-grey"
                  }`}
                >
                  {currentUser &&
                    userList[currentUser].gists &&
                    formatBigNumber(userList[currentUser].gists.totalCount)}
                </span>
              </p>
            </Tab>
          </Tabs>

          <TabBody className="userContent__tabBody">
            {!currentUser && !gettingUser && (
              <div className="flex justify-center items-center userContent__intro">
                <p>Search for a user</p>
              </div>
            )}

            {gettingUser && (
              <div className="userContent__loading">
                <Loading message="Loading user profile" />
              </div>
            )}

            {currentUser && (
              <>
                <section
                  className="userContent__body"
                  style={{ display: activeTab === 0 ? "block" : "none" }}
                >
                  <TabOverview profile={userList[currentUser]} />
                </section>
                <section
                  className="userContent__body"
                  style={{ display: activeTab === 1 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <h3 className="userContent__tabTitle">Repositories</h3>
                    <TabRepos
                      repos={userList[currentUser].apiData.repos}
                      total={userList[currentUser].repositories.totalCount}
                      onPageChange={handleReposPagination}
                    />
                  </div>
                </section>

                <section
                  className="userContent__body"
                  style={{ display: activeTab === 2 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <h3 className="userContent__tabTitle">Stars</h3>
                    <TabStars
                      stars={userList[currentUser].apiData.stars}
                      total={
                        userList[currentUser].starredRepositories.totalCount
                      }
                      onPageChange={handleStarsPagination}
                    />
                  </div>
                </section>

                <section
                  className="userContent__body"
                  style={{ display: activeTab === 3 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <h3 className="userContent__tabTitle">Followers</h3>
                    <TabFollowers
                      followers={userList[currentUser].apiData.followers}
                      total={userList[currentUser].followers.totalCount}
                      url={userList[currentUser].url}
                    />
                  </div>
                </section>

                <section
                  className="userContent__body"
                  style={{ display: activeTab === 4 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <h3 className="userContent__tabTitle">Following</h3>
                    <TabFollowing
                      following={userList[currentUser].apiData.following}
                      total={userList[currentUser].following.totalCount}
                      url={userList[currentUser].url}
                    />
                  </div>
                </section>

                <section
                  className="userContent__body"
                  style={{ display: activeTab === 5 ? "block" : "none" }}
                >
                  <div className="userContent__bodyInner scrollable -yOnly">
                    <h3 className="userContent__tabTitle">Gists</h3>
                    <TabGists
                      gists={userList[currentUser].apiData.gists}
                      total={userList[currentUser].gists.totalCount}
                      onPageChange={handleGistsPagination}
                    />
                  </div>
                </section>
              </>
            )}
          </TabBody>
        </div>
      </section>
    </div>
  );
}
