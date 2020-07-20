import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Anchor, Hourglass } from "react95";

import { AreaChart, HeatChart, PieChart } from "../../components/Charts";
import Card from "../../components/Card";
import RepoButton from "../../components/RepoButton";

import { userChartData } from "../../store";
import formatDate from "../../utilities/formatDate";
import processUserLanguages from "../../utilities/processUserLanguages";

export default function Overview({ profile }) {
  const activity = useRecoilValue(userChartData);
  const [topLangauges, setLanguages] = React.useState([]); // TODO move this to recoil

  React.useEffect(() => {
    console.log(
      "~/Sites/github95/src/views/UserWindow/Overview >>>",
      activity,
      processUserLanguages(profile.repositories)
    );
    setLanguages(processUserLanguages(profile.repositories));
  }, [profile, activity]);

  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="overview">
        <div className="flex flex-auto overview__header">
          <div className="bevelBorder-outset overview__profileImage">
            <img src={profile.avatarUrl} alt="" />
          </div>
          <div className="flex flex-column flex-auto justify-between overview__user">
            <div className="flex justify-between">
              <h2 className="overview__name">
                {profile.name ? profile.name : "-"}
                <span className="badge -grey -small overview__login">
                  {profile.login}
                </span>
              </h2>
              <div>based, member since, updated at</div>
            </div>
            <div>
              <div className="overview__bio">
                <p>{profile.bio || "No bio information found"}</p>
              </div>
            </div>
            <div className="flex items-baseline">
              <p>
                <Anchor
                  href={profile.url}
                  className="overview__link -profile"
                  target="_blank"
                >
                  Open on github.com
                </Anchor>
              </p>
              {profile.email.length > 0 && (
                <p>
                  <Anchor
                    href={`mailto:${profile.email}`}
                    className="overview__link -email"
                  >
                    Send email
                  </Anchor>
                </p>
              )}
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

          <div className="flex justify-between p2 bevelBorder overview__chartWrapper">
            <div className="overview__chartCol">
              <h3>Number of repositories</h3>
              <div className="overview__chart">
                {!activity || !activity[profile.login] ? (
                  <Hourglass size={32} />
                ) : (
                  <AreaChart
                    name="Repos"
                    data={activity[profile.login].repositories.repoTotals}
                    labels={activity[profile.login].repositories.monthsList}
                  />
                )}
              </div>
            </div>
            <div className="overview__chartCol">
              <h3>Favourite languages</h3>
              <div className="overview__chart">
                {topLangauges[0] && <PieChart topLangauges={topLangauges} />}
              </div>
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

          {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
            <>
              <h3 className="mt3 mb1">Showcased repositories</h3>
              <div className="flex flex-wrap justify-between">
                {profile.pinnedItems.edges.map(({ node }) => (
                  <div
                    className="border-box bevelBorder overview__pin"
                    key={node.name}
                  >
                    <div className="overview__pinInner">
                      <p className="overview__pinName">{node.name}</p>
                      <p className="overview__pinDesc">{node.description}</p>
                      {node.primaryLanguage !== null ? (
                        <p
                          className={`overview__pinBadge -language -${node.primaryLanguage.name}`}
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
                      <RepoButton
                        name={node.name}
                        owner={profile.login}
                        className="overview__pinButton"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex-auto bevelBorder overview__events">
            <p>Latest Events || 'no events'</p>
          </div>
        </div>
      </div>
    </div>
  );
}
