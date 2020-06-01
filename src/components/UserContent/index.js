import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody } from "react95";

import Overview from "./Overview";
import Repos from "./Repos";
import Stars from "./Stars";
import Followers from "./Followers";
import Following from "./Following";

export default function UserContent({
  profile,
  contributions,
  activity,
  repos,
  stars,
  followers,
  following,
  onTabChange,
}) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (value) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <div className="userContent">
      <Tabs
        value={activeTab}
        onChange={handleChange}
        className="userContent__tabs"
      >
        <Tab value={0} className="userContent__tab">
          <p>Overview</p>
        </Tab>
        <Tab value={1} className="userContent__tab">
          <p>
            Repositories
            <span className={`badge ${activeTab === 1 ? "-blue" : "-grey"}`}>
              {profile.repositories && profile.repositories.totalCount}
            </span>
          </p>
        </Tab>
        <Tab value={2} className="userContent__tab">
          <p>
            Stars
            <span className={`badge ${activeTab === 2 ? "-blue" : "-grey"}`}>
              {profile.starredRepositories &&
                profile.starredRepositories.totalCount}
            </span>
          </p>
        </Tab>
        <Tab value={3} className="userContent__tab">
          <p>
            Followers
            <span className={`badge ${activeTab === 3 ? "-blue" : "-grey"}`}>
              {profile.followers && profile.followers.totalCount}
            </span>
          </p>
        </Tab>
        <Tab value={4} className="userContent__tab">
          <p>
            Following
            <span className={`badge ${activeTab === 4 ? "-blue" : "-grey"}`}>
              {profile.following && profile.following.totalCount}
            </span>
          </p>
        </Tab>
      </Tabs>
      <TabBody
        className="userContent__body"
        style={{ display: activeTab === 0 ? "block" : "none" }}
      >
        <Overview
          profile={profile}
          activity={activity}
          contributions={contributions}
        />
      </TabBody>

      <TabBody
        className="userContent__body"
        style={{ display: activeTab === 1 ? "block" : "none" }}
      >
        <Repos repos={repos} />
      </TabBody>

      <TabBody
        className="userContent__body"
        style={{ display: activeTab === 2 ? "block" : "none" }}
      >
        <div className="userContent__bodyInner scrollable -yOnly">
          <Stars stars={stars} />
        </div>
      </TabBody>

      <TabBody
        className="userContent__body"
        style={{ display: activeTab === 3 ? "block" : "none" }}
      >
        <div className="userContent__bodyInner scrollable -yOnly">
          <Followers followers={followers} />
        </div>
      </TabBody>

      <TabBody
        className="userContent__body"
        style={{ display: activeTab === 4 ? "block" : "none" }}
      >
        <div className="userContent__bodyInner scrollable -yOnly">
          <Following following={following} />
        </div>
      </TabBody>
    </div>
  );
}

// TODO
// UserContent.propTypes = {
//   user: PropTypes.shape({
//     // TODO
//   }),
//   onTabChange: PropTypes.func,
// };
