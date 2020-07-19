import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Anchor, Hourglass } from "react95";

import { AreaChart, HeatChart } from "../../components/Charts";
import Card from "../../components/Card";
import RepoButton from "../../components/RepoButton";

import { userActivity } from "../../store";
import capitalize from "../../utilities/capitalize";
import formatDate from "../../utilities/formatDate";
import formatBigNumber from "../../utilities/formatBigNumber";

export default function Overview({ profile }) {
  const activity = useRecoilValue(userActivity);
  const pinNamesInitialState = () => {
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
  const [pinNames, setPins] = React.useState(pinNamesInitialState);

  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="overview">
        <div className="flex overview__header">
          <div className="overview__headerCol">
            <div className="flex">
              <div className="bevelBorder-outset overview__profileImage">
                <img src={profile.avatarUrl} alt="" />
              </div>
              <div className="overview__user">
                <h2 className="overview__name">
                  {profile.name ? profile.name : "-"}
                </h2>
                <p className="badge -grey -small overview__login">
                  {profile.login}
                </p>
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
          <div className="flex flex-column justify-between overview__headerCol">
            <div className="overview__bio">
              <p>{profile.bio}</p>
            </div>
            {profile.status && (
              <div className="flex items-center overview__status">
                <p>Update</p>
                <p className="overview__statusUpdate">
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
              </div>
            )}
          </div>
        </div>
        <div className="overview__body">
          <div className="flex justify-between bevelBorder gradientBorder overview__headerBadges">
            <p className="flex items-center">
              <span className="overview__headerBadgeNumber">
                {profile.issues.totalCount || "0"}
              </span>
              issues
            </p>
            <p className="flex items-center">
              <span className="overview__headerBadgeNumber">
                {profile.pullRequests.totalCount || "0"}
              </span>
              pull requests
            </p>
            <p className="flex items-center">
              <span className="overview__headerBadgeNumber">
                {profile.watching.totalCount || "0"}
              </span>
              watchers
            </p>
          </div>

          {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
            <Card className="mt2 overview__card">
              <h3 className="mt1 mb2">Pinned repositories</h3>
              <div className="flex flex-wrap overview__pins">
                {profile.pinnedItems.edges.map(({ node }) => (
                  <div
                    className="border-box bevelBorder gradientBorder overview__pin"
                    key={node.name}
                  >
                    <div className="overview__pinInner">
                      <p className="overview__pinName">{node.name}</p>
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
                      <RepoButton name={node.name} owner={profile.login} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div>based, member since, updated at</div>

          <div className="flex justify-between p2 bevelBorder overview__chartWrapper">
            <div className="overview__chartCol">
              <h3>Repos over time</h3>
              <div className="overview__chart">
                {!activity && <Hourglass size={32} />}
                {activity && (
                  <AreaChart
                    name="Repos"
                    xaxis={activity.newRepos.monthsList}
                    data={activity.newRepos.repoTotals}
                  />
                )}
              </div>
            </div>
            <div className="overview__chartCol">
              <h3>Favourite languages</h3>
              <div className="overview__chart"></div>
            </div>
          </div>

          <Card className="overview__card">
            <h3 className="mt1 mb2">Contribution calendar</h3>
            {profile.contributions &&
              profile.contributions.totalContributions && (
                <p>
                  {profile.contributions.totalContributions} contributions in
                  the last 12 months
                </p>
              )}
            <div className="bevelBorder overflow_contributionsTable">
              {profile.contributions && profile.contributions.calendar ? (
                <HeatChart data={profile.contributions.calendar} />
              ) : (
                <Hourglass />
              )}
            </div>
          </Card>

          <div className="flex-auto bevelBorder overview__events">
            <p>Latest Events || 'no events'</p>
          </div>
        </div>
      </div>
    </div>
  );
}
