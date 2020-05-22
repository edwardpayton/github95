import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody, Cutout, Anchor } from "react95";

import Charts from "./AreaChart";

export default function UserContent({ profile, activity, onTabChange }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (value) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <>
      <div className="flex flex-column" style={{ flex: 2 }}>
        <div className="flex">
          <img
            src={profile.avatarUrl}
            alt="Github avatar"
            width="100"
            height="100"
            className="square"
          />
          <p>{profile.name}</p>
          <Anchor href={profile.url} target="_blank">
            Profile link
          </Anchor>
          <Anchor href={`mailto:${profile.email}`} target="_blank">
            Email
          </Anchor>
          <p>{profile.bio}</p>

          <p>{profile.status && profile.status.message}</p>
        </div>
        <div className="flex flex-column">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            className="profileTabs"
          >
            <Tab value={0} className="profileTabs-tab">
              <p>Overview</p>
            </Tab>
            <Tab value={1} className="profileTabs-tab">
              <p>
                Repositories
                <span className="profileTabs-badge">
                  {profile.repositories && profile.repositories.totalCount}
                </span>
              </p>
            </Tab>
            <Tab value={2} className="profileTabs-tab">
              <p>
                Gists
                <span className="profileTabs-badge">
                  {profile.gists && profile.gists.totalCount}
                </span>
              </p>
            </Tab>
          </Tabs>
          <div style={{ flex: 2 }}>
            {activeTab === 0 && (
              <TabBody className="profileTabs-body">
                <Cutout style={{ background: "#fff" }}>
                  <div>
                    <p>
                      <a href={profile.url} target="_blank">
                        https://github.com/{profile.login}
                      </a>
                    </p>
                    {profile.email.length > 0 && (
                      <p>
                        <a href={`mailto:${profile.email}`}>Email user</a>
                      </p>
                    )}
                    {/* <p>location: {profile.location}</p>
                    <p>member since: {profile.createdAt}</p>
                    <hr />
                    <p>
                      followers:{" "}
                      {profile.followers && profile.followers.totalCount}
                    </p>
                    <p>
                      following:{" "}
                      {profile.following && profile.followers.totalCount}
                    </p>
                    <hr />
                    <p>repos: {profile.repositories.totalCount}</p>
                    <p>gists: {profile.gists.totalCount}</p>
                    <p>
                      starred repos: {profile.starredRepositories.totalCount}
                    </p> */}
                    {activity && (
                      <Charts
                        name="Repos"
                        xaxis={activity.creations.monthsList}
                        data={activity.creations.repoTotals}
                      />
                    )}
                    {profile.pinnedItems &&
                      profile.pinnedItems.edges.length > 0 && (
                        <>
                          <h3>Pins</h3>
                          <div className="flex flex-wrap profileTabs-pins">
                            {profile.pinnedItems.edges.map(({ node }) => (
                              <div
                                className="col-6 border-box profileTabs-pin"
                                key={node.name}
                              >
                                <div className="profileTabs-pinInner">
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
                </Cutout>
              </TabBody>
            )}
            {activeTab === 1 && (
              <TabBody className="profileTabs-body">Repositories</TabBody>
            )}
            {activeTab === 2 && (
              <TabBody className="profileTabs-body">Gists</TabBody>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* <table>
                <tbody>
                  {repos.map((repo) => (
                    <tr>
                      <td>{repo["name"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
      </div>
    </>
  );
}

UserContent.propTypes = {
  user: PropTypes.shape({
    // TODO
  }),
  onTabChange: PropTypes.func,
};
