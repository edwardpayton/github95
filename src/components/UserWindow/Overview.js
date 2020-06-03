import React from "react";
import PropTypes from "prop-types";
import { Anchor, Hourglass } from "react95";

import AreaChart from "../AreaChart";
import HeatChart from "../HeatChart";
import Card from "../Card";
import AnchorButton from "../AnchorButton";

import formatDate from "../../utilities/formatDate";

export default function Overview({ profile, activity, contributions }) {
  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="overview">
        <div className="bgBlue overview__header">
          <div className="card -bgWhite overview__profile">
            <div className="flex">
              <div className="bevelBorder overview__profileImage">
                <img
                  src={profile.avatarUrl}
                  alt="Github avatar"
                  className="square"
                />
              </div>
              <div className="flex flex-column justify-between overview__profileDetails">
                <h1 className="overview__title">{profile.name}</h1>
                <Anchor
                  href={profile.url}
                  target="_blank"
                  className="overview__url"
                >
                  github.com/{profile.login}
                </Anchor>
                <div className="overview__bio">
                  {/* <p className="overview__bioCopy"> */}
                  <p className="overview__bioCopy">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostru
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
          </div>

          {profile.status && (
            <div className="overview__statusWrapper">
              <p className="overview__status">
                {profile.status.message}
                <span>
                  {formatDate(profile.status.updatedAt, {
                    time: true,
                    day: true,
                    month: true,
                    year: true,
                  })}
                </span>
              </p>
              <div className="overview__statusTitle">
                <p className="badge -grey overview__badge">Current status</p>
              </div>
            </div>
          )}
        </div>
        <div className="overview__body">
          <Card className="flex justify-between overview__charts">
            <div className="overview__chartWrapper">
              <h3 className="mb2">Repos over time</h3>
              <div className="bevelBorder overview__chart">
                {!activity && <Hourglass size={32} />}
                {activity && (
                  <AreaChart
                    name="Repos"
                    xaxis={activity.creations.monthsList}
                    data={activity.creations.repoTotals}
                  />
                )}
              </div>
            </div>
            <div className="overview__chartWrapper">
              <h3 className="mb2">Favourite languages</h3>
              <div className="bevelBorder overview__chart"></div>
            </div>
          </Card>
          <Card className="overview__pins">
            {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
              <>
                <h3 className="mb2">Pins</h3>
                <div className="flex flex-wrap">
                  {profile.pinnedItems.edges.map(({ node }) => (
                    <div
                      className="col-6 border-box bevelBorder overview__pin"
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
            <h3 className="mb2">Contribution calendar</h3>
            {contributions && contributions.totalContributions && (
              <p>
                {contributions.totalContributions} contributions in the last 12
                months
              </p>
            )}
            <div className="bevelBorder overflow_contributionsTable">
              {contributions && contributions.calendar ? (
                <HeatChart data={contributions.calendar} />
              ) : (
                <p>loading</p>
              )}
            </div>
          </Card>
        </div>
        <div className="flex bgBlue overview__footer">
          <p>Data last updated on:</p>
          <p>Save user to desktop</p>
        </div>
      </div>
    </div>
  );
}
