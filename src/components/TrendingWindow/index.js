import React from "react";
import { useRecoilValue } from "recoil";

import Avatar from "./Avatar";

import { trendingRepos, trendingDevs } from "../../store";
import { useTrendingApi } from "../../githubApi";

export default function TrendingWindow() {
  const repos = useRecoilValue(trendingRepos);
  const devs = useRecoilValue(trendingDevs);

  const { getTrendingRepos, getTrendingDevelopers } = useTrendingApi();
  React.useEffect(() => {
    getTrendingRepos("weekly");
    getTrendingDevelopers();
  }, []);

  React.useEffect(() => {
    console.log(
      "~/Sites/github95/src/components/RepoTrendingWindow/index >>>",
      repos,
      devs
    );
  }, [repos, devs]);

  return (
    <>
      <div className="flex flex-column repoTrending">Trending Repos</div>
      {devs.daily && devs.daily[0] && <Avatar src={devs.daily[0].avatar} />}
    </>
  );
}
