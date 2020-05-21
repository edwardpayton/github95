import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody, Cutout, Anchor } from "react95";

import Charts from "./Charts";

export default function UserContent({ user, onTabChange }) {
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
            src={user.avatarUrl}
            alt="Github avatar"
            width="100"
            height="100"
            className="square"
          />
          <p>{user.name}</p>
          <Anchor href={user.url} target="_blank">
            Profile link
          </Anchor>
          <Anchor href={`mailto:${user.email}`} target="_blank">
            Email
          </Anchor>
          <p>{user.bio}</p>

          <p>{user.status && user.status.message}</p>
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
              <p>Pins</p>
            </Tab>
            <Tab value={2} className="profileTabs-tab">
              <p>
                Repositories
                <span className="profileTabs-badge">
                  {user.repositories && user.repositories.totalCount}
                </span>
              </p>
            </Tab>
            <Tab value={3} className="profileTabs-tab">
              <p>
                Gists
                <span className="profileTabs-badge">
                  {user.gists && user.gists.totalCount}
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
                      <a href={user.url} target="_blank">
                        https://github.com/{user.login}
                      </a>
                    </p>
                    {user.email.length > 0 && (
                      <p>
                        <a href={`mailto:${user.email}`}>Email user</a>
                      </p>
                    )}
                    <p>location: {user.location}</p>
                    <p>member since: {user.createdAt}</p>
                    <hr />
                    <p>
                      followers: {user.followers && user.followers.totalCount}
                    </p>
                    <p>
                      following: {user.following && user.followers.totalCount}
                    </p>
                    <hr />
                    <p>repos: {user.repositories.totalCount}</p>
                    <p>gists: {user.gists.totalCount}</p>
                    <p>starred repos: {user.starredRepositories.totalCount}</p>
                    <Charts />
                  </div>
                </Cutout>
              </TabBody>
            )}
            {activeTab === 1 && (
              <TabBody className="profileTabs-body">
                {user.pinnedItems && user.pinnedItems.edges.length > 0 ? (
                  <>
                    <h3>Pins</h3>
                    <div className="flex flex-wrap profileTabs-pins">
                      {user.pinnedItems.edges.map(({ node }) => (
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
                ) : (
                  <p>Nothing here</p>
                )}
              </TabBody>
            )}
            {activeTab === 2 && (
              <TabBody className="profileTabs-body">Repositories</TabBody>
            )}
            {activeTab === 3 && (
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
