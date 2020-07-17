import React from "react";
import { Bar, Button } from "react95";
import { useRecoilValue } from "recoil";

import Shortcuts from "./Shortcuts";
import FileTree from "../FileTree";

import { trending } from "../../store";
import { useTrendingApi } from "../../githubApi";
import { TRENDING_TREE } from "../../constants";

import "./styles.scss";

export default function TrendingWindow() {
  const trends = useRecoilValue(trending);
  const [shortcuts, setShortcuts] = React.useState(trends);
  const [type, setType] = React.useState("repositories");
  const [period, setPeriod] = React.useState("daily");

  const { getTrending } = useTrendingApi();

  React.useEffect(() => {
    getTrending("repositories");
  }, []);

  React.useEffect(() => {
    setShortcuts(trends[type][period]);
  }, [trends]);

  const handleTreeClick = (branch) => {
    const [type, period] = branch.split("/");
    setType(type);
    setPeriod(period);
    if (trends[type][period]) return setShortcuts(trends[type][period]);
    return getTrending(type, period);
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
          <p>
            Contents of '{type} \ {period}''
          </p>
        </div>
        <div className="flex flex-auto trendingWindow__panels">
          <div className="trendingWindow__panel -tree scrollable -yOnly">
            <FileTree
              files={TRENDING_TREE}
              titleRow="Github"
              onRowClick={() => ""}
              onFileClick={handleTreeClick}
            />
          </div>

          <div className="flex flex-wrap trendingWindow__panel -icons scrollable -yOnly">
            {trends[type][period] && (
              <Shortcuts shortcuts={shortcuts} type={type} />
            )}
          </div>
        </div>

        <div className="trendingWindow__footer">
          <p>{shortcuts ? Object.keys(shortcuts).length : 0} items</p>
        </div>
      </section>
    </>
  );
}
