import React from "react";
import { Bar } from "react95";
import { useRecoilValue } from "recoil";

import Avatar from "./Avatar";
import Icon from "./Icon";

import { trendingRepos, trendingDevs } from "../../store";
import { useTrendingApi } from "../../githubApi";

import "./styles.scss";

export default function TrendingWindow() {
  const repos = useRecoilValue(trendingRepos);
  const devs = useRecoilValue(trendingDevs);

  const { getTrendingRepos, getTrendingDevelopers } = useTrendingApi();

  React.useEffect(() => {
    getTrendingRepos();
    getTrendingDevelopers();
  }, []);

  React.useEffect(() => {
    console.log(
      "~/Sites/github95/src/components/RepoTrendingWindow/index >>>",
      repos
      // devs
    );
  }, [repos]);

  return (
    <>
      <section className="flex flex-column trendingWindow">
        <div className="flex justify-between trendingWindow__header">
          <div className="flex flex-auto items-center trendingWindow__headerButtons">
            <Bar className="trendingWindow__bar" />
            <p>File</p>
            <p>Edit</p>
            <p>View</p>
          </div>
          <div className="flex trendingWindow__logo">
            <div className="trendingWindow__logoBg" />
            <img
              src={`${require("../../assets/win-logo.png")}`}
              alt=""
              width="30"
            />
          </div>
        </div>
        <div className="flex trendingWindow__panelHeader">
          <p>All Folders</p>
          <p>Contents of trending repos</p>
        </div>
        <div className="flex flex-auto trendingWindow__panels">
          <div className="trendingWindow__panel -tree scrollable -yOnly">
            <ul>
              <li>tree</li>
            </ul>
          </div>

          <div className="flex flex-wrap trendingWindow__panel -icons scrollable -yOnly">
            {repos.daily &&
              Object.keys(repos.daily).map((repo) => {
                const data = repos.daily[repo];
                return (
                  <Icon key={data.name} avatar={data.avatar} name={data.name} />
                );
              })}
          </div>
        </div>

        <div className="trendingWindow__footer">
          <p>{repos.daily ? Object.keys(repos.daily).length : 0} items</p>
        </div>
      </section>
    </>
  );
}
