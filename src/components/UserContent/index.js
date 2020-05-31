import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody } from "react95";

import Overview from "./Overview";
import Repos from "./Repos";

export default function UserContent({
  profile,
  repos,
  contributions,
  activity,
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
            <span className="badge -blue">
              {profile.repositories && profile.repositories.totalCount}
            </span>
          </p>
        </Tab>
        <Tab value={2} className="userContent__tab">
          <p>
            Gists
            <span className="badge -blue">
              {profile.gists && profile.gists.totalCount}
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
        <div className="userContent__bodyInner scrollable -yOnly">Gists</div>
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
