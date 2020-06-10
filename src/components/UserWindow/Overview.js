import React from "react";
import PropTypes from "prop-types";
import { Anchor, Hourglass } from "react95";

import { AreaChart, HeatChart } from "../Charts";
import Card from "../Card";

import capitalize from "../../utilities/capitalize";
import formatDate from "../../utilities/formatDate";
import formatBigNumber from "../../utilities/formatBigNumber";

export default function Overview({ profile, activity, contributions }) {
  const pinList = () => {
    const pinSet = new Set();
    profile.pinnedItems.edges.forEach(
      ({ node }) =>
        node.primaryLanguage &&
        node.primaryLanguage.name &&
        pinSet.add(node.primaryLanguage.name)
    );
    const [last, ...remaining] = [...pinSet].reverse();
    const pinStr = `${remaining.join(", ")} & ${last}`;
    return pinStr;
  };
  const [pinNames, setPins] = React.useState(pinList);

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
              <div className="flex flex-column justify-around overview__profileDetails">
                <h2 className="overview__title">
                  {profile.name ? profile.name : "-"}
                  <span className="badge -grey overview__login">
                    {profile.login}
                  </span>
                </h2>
                <div className="overview__bio">
                  {/* <p className="overview__bioCopy"> */}
                  <p className="overview__bioCopy">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostru
                  </p>
                </div>
                <div className="overview__links">
                  <Anchor
                    href={profile.url}
                    className="overview__link -profile"
                    target="_blank"
                  >
                    Open on github.com
                  </Anchor>
                  {profile.email.length > 0 && (
                    <Anchor
                      href={`mailto:${profile.email}`}
                      className="overview__link -email"
                    >
                      Send email
                    </Anchor>
                  )}
                </div>
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
                Followers: {formatBigNumber(profile.followers.totalCount)}
              </p>
              <p className="badge overview__badge -following">
                Following: {formatBigNumber(profile.following.totalCount)}
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
          <Card className="flex justify-between overview__card -topCard">
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

          {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
            <Card className="overview__card">
              <h3 className="mb2">Pinned repositories</h3>
              <p>
                <span className="badge -grey">{capitalize(profile.login)}</span>{" "}
                is showcasing {profile.pinnedItems.edges.length}{" "}
                {profile.pinnedItems.edges.length === 1
                  ? "repository"
                  : "repositories"}{" "}
                demonstrating a talent using {pinNames}
              </p>
              <div className="flex flex-wrap overview__pins">
                {profile.pinnedItems.edges.map(({ node }) => (
                  <div
                    className="border-box bevelBorder gradientBorder overview__pin"
                    key={node.name}
                  >
                    <div className="overview__pinInner">
                      <p>
                        <Anchor
                          href={node.url}
                          target="_blank"
                          className="overview__pinName"
                        >
                          {node.name}
                        </Anchor>
                      </p>
                      <p className="overview__pinDesc">{node.description}</p>
                      {node.primaryLanguage !== null ? (
                        <p
                          className={`userRepos__badge -language -${node.primaryLanguage.name}`}
                        >
                          <span
                            className="badge"
                            style={{
                              backgroundColor: node.primaryLanguage.color,
                            }}
                          ></span>
                          {node.primaryLanguage.name}
                        </p>
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="overview__card">
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
