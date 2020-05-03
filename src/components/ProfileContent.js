import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody } from "react95";

import { userData } from "../hooks/sharedStates";

export default function ProfileContent() {
  const [{ user, repos }] = userData();

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="col-2">
          <img
            src={user["avatarUrl"]}
            alt="Github avatar"
            width="100"
            height="100"
            className="square"
          />
          <p>{user.status && user.status.message}</p>

          <p>{user.name}</p>
          <p>{user.login}</p>

          <p>{user.bio}</p>
          <p>{user.location}</p>
        </div>
        <div className="flex-auto col-10">
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
                  {user.repositories && user.repositories.totalCount}
                </span>
              </p>
            </Tab>
            <Tab value={2} className="profileTabs-tab">
              <p>
                Gists
                <span className="profileTabs-badge">
                  {user.gists && user.gists.totalCount}
                </span>
              </p>
            </Tab>
          </Tabs>
          <div>
            {activeTab === 0 && (
              <TabBody className="profileTabs-body">
                {user.pinnedItems && user.pinnedItems.edges.length > 0 && (
                  <div className="profileTabs-pins">
                    <h3>Pins</h3>
                    <div
                      className="flex flex-wrap"
                      style={{ margin: "0 -6px" }}
                    >
                      {user.pinnedItems.edges.map(({ node }) => (
                        <div
                          style={{ padding: 3 }}
                          className="col-6 border-box"
                          key={node.name}
                        >
                          <div style={{ border: "4px ridge", padding: 4 }}>
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
                  </div>
                )}
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
        <p>email: {user.email}</p>
        <p>html_url: {user.url}</p>
        <p>created_at: {user.createdAt}</p>
        <p>followers: {user.followers && user.followers.totalCount}</p>
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

ProfileContent.propTypes = {
  user: PropTypes.shape({
    // TODO
  }),
};
