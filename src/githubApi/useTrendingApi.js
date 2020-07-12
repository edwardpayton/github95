import React from "react";
import { useRecoilState } from "recoil";

import { trendingRepos, trendingDevs } from "../store";
import { apiGetTrending } from "./api.v3";

export default function useTrendingApi() {
  const [repos, setRepos] = useRecoilState(trendingRepos);
  const [devs, setDevs] = useRecoilState(trendingDevs);

  const getTrendingRepos = async (time = "daily") => {
    let results = await apiGetTrending("repositories", time);

    if (!results[0]) {
      results = ["No results"];
    }

    setRepos({ ...repos, [time]: results });
  };

  const getTrendingDevelopers = async (time = "daily") => {
    let results = await apiGetTrending("developers", time);

    if (!results[0]) {
      results = ["No results"];
    }
    const aa = { ...devs, [time]: results };
    console.log("~/Sites/github95/src/githubApi/useTrendingApi >>>", aa);

    setDevs(aa);
  };

  return {
    getTrendingRepos,
    getTrendingDevelopers,
  };
}
