import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody, Hourglass } from "react95";

import Charts from "./AreaChart";

const dateOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function UserContent({ profile, activity, onTabChange }) {
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
            <span className="badge">
              {profile.repositories && profile.repositories.totalCount}
            </span>
          </p>
        </Tab>
        <Tab value={2} className="userContent__tab">
          <p>
            Gists
            <span className="badge">
              {profile.gists && profile.gists.totalCount}
            </span>
          </p>
        </Tab>
      </Tabs>
      {activeTab === 0 && (
        <TabBody className="userContent__body">
          <div className="userContent__bodyInner scrollable -yOnly">
            <div className="overview">
              <div className="flex overview__header">
                <div className="overview__headerImage">
                  <img
                    src={profile.avatarUrl}
                    alt="Github avatar"
                    className="square"
                  />
                </div>
                <div className="flex flex-column justify-between overview__headerBio">
                  <div className="flex">
                    <div className="flex items-center">
                      <h1 className="overview__title">{profile.name}</h1>
                      {profile.status && (
                        <p className="overview__subtitle">
                          {profile.status.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <p className="overview__bioCopy"> */}
                  <p className="overview__bioCopy">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostru
                  </p>
                </div>
                <div className="flex flex-column justify-between overview__links">
                  <a
                    href={profile.url}
                    target="_blank"
                    className="anchorButton overview__link -profile"
                  >
                    Profile link
                  </a>
                  {profile.email.length > 0 && (
                    <a
                      href={`mailto:${profile.email}`}
                      target="_blank"
                      className="anchorButton overview__link -email"
                    >
                      Send email
                    </a>
                  )}
                </div>
              </div>
              <div className="flex overview__badges">
                {profile.location && (
                  <p className="overview__badge -location">
                    Based in: {profile.location}
                  </p>
                )}
                <p className="overview__badge -createdAt">
                  Member since:{" "}
                  {new Date(profile.createdAt).toLocaleDateString(
                    undefined,
                    dateOptions
                  )}
                </p>
                <p className="overview__badge -followers">
                  Followers: {profile.followers.totalCount}
                </p>
                <p className="overview__badge -following">
                  Following: {profile.followers.totalCount}
                </p>
              </div>
              <div className="flex overview__charts">
                <div>
                  {!activity && <Hourglass size={32} />}
                  {activity && (
                    <Charts
                      name="Repos"
                      xaxis={activity.creations.monthsList}
                      data={activity.creations.repoTotals}
                    />
                  )}
                </div>
                <div>Languages chart</div>
              </div>
              <div className="overview__pins">
                {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
                  <>
                    <h3>Pins</h3>
                    <div className="flex flex-wrap userContent__pins">
                      {profile.pinnedItems.edges.map(({ node }) => (
                        <div
                          className="col-6 border-box userContent__pin"
                          key={node.name}
                        >
                          <div className="userContent__pinInner">
                            <p>
                              <a href={node.url} target="_blank">
                                {node.name}
                              </a>
                            </p>
                            <p>{node.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="overflow_contributions">
                Contribution calendar
              </div>
            </div>
          </div>
        </TabBody>
      )}
      {activeTab === 1 && (
        <TabBody className="userContent__body">
          <div className="userContent__bodyInner scrollable -yOnly">
            Repositories
            {/*<div>
                <table>
                       <tbody>
                         {repos.map((repo) => (
                           <tr>
                             <td>{repo["name"]}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
             </div> */}
          </div>
        </TabBody>
      )}
      {activeTab === 2 && (
        <TabBody className="userContent__body">
          <div className="userContent__bodyInner scrollable -yOnly">Gists</div>
        </TabBody>
      )}
    </div>
  );
}

UserContent.propTypes = {
  user: PropTypes.shape({
    // TODO
  }),
  onTabChange: PropTypes.func,
};
