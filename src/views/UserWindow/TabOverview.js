import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Anchor, Hourglass } from "react95";

import { PieChart } from "../../components/Charts";
import RepoButton from "../../components/RepoButton";
import ReposOverTime from "./ReposOverTime";
import Activity from "./Activity";
import Events from "./Events";

import { userChartData, userEventsData } from "../../store";
import { useUserApi } from "../../githubApi";
import formatDate from "../../utilities/formatDate";
import processUserLanguages from "../../utilities/processUserLanguages";

export default function TabOverview({ profile }) {
  const activity = useRecoilValue(userChartData);
  const events = useRecoilValue(userEventsData);
  const [topLangauges, setLanguages] = React.useState({}); // TODO move this to recoil
  const refOverview = React.useRef(undefined);
  const refEventsElem = React.useRef(undefined);
  const refObserver = React.useRef(undefined);

  React.useEffect(() => {
    if (profile.repositories) {
      setLanguages(processUserLanguages(profile.repositories));
    }
  }, [profile, activity]);

  React.useEffect(() => {
    refOverview.current.scrollTop = 0;
  }, [profile.login]);

  const { getUserEvents } = useUserApi();

  const getEvents = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        getUserEvents();
        refObserver.current.disconnect();
      }
    });
  };

  const observeScroll = () => {
    let options = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 1.0,
    };
    refObserver.current = new IntersectionObserver(getEvents, options);
    refObserver.current.observe(refEventsElem.current);
  };

  React.useEffect(() => {
    refEventsElem.current !== undefined && observeScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refEventsElem, profile.login]); // observeScroll - unneeded

  return (
    <div className="userContent__bodyInner scrollable -yOnly" ref={refOverview}>
      <div className="overview">
        <div className="flex flex-auto overview__header">
          <div className="bevelBorder-outset overview__profileImage">
            <img src={profile.avatarUrl} alt="" />
          </div>
          <div className="flex flex-column flex-auto justify-between overview__user">
            <h2 className="overview__name">
              {profile.name ? profile.name : "-"}
              <span className="badge -grey -small overview__titleBadge">
                {profile.login}
              </span>
            </h2>

            <div className="flex overview__badges">
              {profile.location && (
                <p className="badge -grey -small">Based: {profile.location}</p>
              )}
              {profile.createdAt && (
                <p className="badge -grey -small">
                  Member since: {formatDate(profile.createdAt)}
                </p>
              )}
              {profile.updatedAt && (
                <p className="badge -grey -small">
                  Updated at: {formatDate(profile.updatedAt)}
                </p>
              )}
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
                  <p className="overview__statusTitle">Update</p>
                  <p className="overview__statusUpdate">
                    <span>{profile.status.message}</span>
                    <span className="overview__statusTime">
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
          <div className="mt1 p2 bevelBorder overview__bodyContent">
            {profile.bio && (
              <div className="p2 m2 flatBorder overview__bio">
                <p>{profile.bio}</p>
              </div>
            )}

            {profile.pinnedItems && profile.pinnedItems.edges.length > 0 && (
              <>
                <h3 className="p2">
                  Showcase{" "}
                  <span className="badge -grey -small overview__titleBadge">
                    {profile.pinnedItems.edges.length} repositories
                  </span>
                </h3>

                {profile.pinnedItems.edges &&
                profile.pinnedItems.edges.length > 0 ? (
                  <div className="flex flex-wrap justify-between bgGradient overview__pins">
                    {profile.pinnedItems.edges.map(({ node }) => (
                      <div
                        className="border-box flatBorder overview__pin"
                        key={node.name}
                      >
                        <div className="overview__pinInner">
                          <p className="overview__pinName">{node.name}</p>
                          <p className="overview__pinDesc">
                            {node.description}
                          </p>
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
                ) : (
                  <p>No pinned repositories found</p>
                )}
              </>
            )}

            <div className="flex justify-between overview__chartWrapper">
              <div className="overview__chartCol">
                <h3
                  className={`p2 pt3${
                    profile.repositories.totalCount > 100 ? " center" : ""
                  }`}
                >
                  Repositories
                </h3>
                <div className="pl2 pr1 overview__chart">
                  {!activity || !activity[profile.login] ? (
                    <Hourglass size={32} />
                  ) : (
                    <ReposOverTime
                      activity={activity[profile.login]}
                      total={profile.repositories.totalCount}
                      startDate={formatDate(profile.createdAt)}
                    />
                  )}
                </div>
              </div>
              <div className="overview__chartCol">
                <h3 className="p2 pt3">
                  Top Languages{" "}
                  <span className="badge -grey -small overview__titleBadge">
                    Based on 10 recent repos
                  </span>
                </h3>
                <div className="pl1 pr2 overview__chart">
                  {topLangauges["series"] &&
                  topLangauges["series"].length > 0 ? (
                    <PieChart data={topLangauges} />
                  ) : (
                    <p>Cannot show this users top languages</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt1 overview__chartWrapper">
              <h3 className="p2 pt3">Activity</h3>

              {!activity || !activity[profile.login] ? (
                <Hourglass size={32} />
              ) : (
                <div className="pl2 pr2 overflow_contributions">
                  <Activity data={activity[profile.login].contributions} />
                </div>
              )}
            </div>

            <div className="pt1 overview__eventsWrapper" ref={refEventsElem}>
              <h3 className="p2 pt3">Activity from last 90 days</h3>
              <div className="p2 mt1 mb2 mx2 scrollable -yOnly bevelBorder overview__events">
                {events[profile.login] ? (
                  <>
                    {Object.keys(events[profile.login]).length > 0 ? (
                      <Events events={events[profile.login]} />
                    ) : (
                      <p>No events</p>
                    )}
                  </>
                ) : (
                  <p>Loading events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
