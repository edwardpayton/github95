import React from "react";
import { Bar, Button } from "react95";
import { useRecoilValue } from "recoil";

import Tree from "./Tree";
import Shortcuts from "./Shortcuts";

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

  const handleTreeClick = (type, period) => {
    console.log(
      "~/Sites/github95/src/components/TrendingWindow/index >>>",
      type,
      period
    );
  };

  return (
    <>
      <section className="flex flex-column trendingWindow">
        <div className="flex justify-between trendingWindow__header">
          <div className="flex flex-auto items-center trendingWindow__headerButtons">
            <Bar className="trendingWindow__bar" />
            <Button variant="menu" size="sm">
              File
            </Button>
            <Button variant="menu" size="sm">
              Edit
            </Button>
            <Button variant="menu" size="sm">
              View
            </Button>
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
            <Tree onClick={handleTreeClick} />
          </div>

          <div className="flex flex-wrap trendingWindow__panel -icons scrollable -yOnly">
            <Shortcuts shortcuts={repos.daily} />
          </div>
        </div>

        <div className="trendingWindow__footer">
          <p>{repos.daily ? Object.keys(repos.daily).length : 0} items</p>
        </div>
      </section>
    </>
  );
}
