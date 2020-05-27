import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody, Hourglass } from "react95";

import Charts from "./AreaChart";
import Card from "./Card";
import AnchorButton from "./AnchorButton";

import formatDate from "../utilities/formatDate";

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
              <div className="overview__header">
                <div className="card overview__profile">
                  <div className="flex">
                    <div className="overview__profileImage">
                      <img
                        src={profile.avatarUrl}
                        alt="Github avatar"
                        className="square"
                      />
                    </div>
                    <div className="flex flex-column justify-between overview__profileDetails">
                      <h1 className="overview__title">{profile.name}</h1>

                      <div className="overview__bio">
                        {/* <p className="overview__bioCopy"> */}
                        <p className="overview__bioCopy">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostru
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overview__links">
                    <AnchorButton
                      href={profile.url}
                      className="overview__link -profile"
                    >
                      Profile link
                    </AnchorButton>
                    {profile.email.length > 0 && (
                      <AnchorButton
                        href={`mailto:${profile.email}`}
                        className="overview__link -email"
                      >
                        Send email
                      </AnchorButton>
                    )}
                  </div>
                </div>

                <div className="flex justify-between overview__badges">
                  {profile.location && (
                    <p className="badge overview__badge -location">
                      Based in: {profile.location}
                    </p>
                  )}
                  <p className="badge overview__badge -createdAt">
                    Joined: {formatDate(profile.createdAt)}
                  </p>
                  <p className="badge overview__badge -followers">
                    Followers: {profile.followers.totalCount}
                  </p>
                  <p className="badge overview__badge -following">
                    Following: {profile.following.totalCount}
                  </p>
                </div>

                {profile.status && (
                  <div className="overview__statusWrapper">
                    <p className="overview__statusTitle">Latest update</p>
                    <p className="overview__status">{profile.status.message}</p>
                  </div>
                )}
              </div>
              <div className="overview__body">
                <Card className="flex justify-between overview__charts">
                  <div className="overview__chart">
                    {!activity && <Hourglass size={32} />}
                    {activity && (
                      <Charts
                        name="Repos"
                        xaxis={activity.creations.monthsList}
                        data={activity.creations.repoTotals}
                      />
                    )}
                  </div>
                  <div className="overview__chart">Languages chart</div>
                </Card>
                <Card className="overview__pins">
                  {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
                    <>
                      <h3>Pins</h3>
                      <div className="flex flex-wrap">
                        {profile.pinnedItems.edges.map(({ node }) => (
                          <div
                            className="col-6 border-box overview__pin"
                            key={node.name}
                          >
                            <div className="overview__pinInner">
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
                </Card>
                <Card className="overflow_contributions">
                  Contribution calendar
                </Card>
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
