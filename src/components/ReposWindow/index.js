import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { reposListObj, reposSearchInput } from "../../store";

import Toolbar from "./Toolbar";

import useGithubApi from "../../githubApi";

import "./styles.scss";

export default function AboutWindow() {
  const [repoList, setList] = useRecoilState(reposListObj);
  const searchInputValue = useRecoilValue(reposSearchInput);

  return (
    <>
      <Toolbar />
      <div className="repoWindow__content">
        <div className="repoContent">Repos</div>
      </div>
    </>
  );
}
