import React from "react";
import PropTypes from "prop-types";
import { useRecoilState, useRecoilValue } from "recoil";
import { reposListObj, reposSearchInput } from "../../store";

import Toolbar from "./Toolbar";
// import { Pagination } from "../Pagination/class";
import Pagination from "../Pagination";

import useGithubApi from "../../githubApi";

import "./styles.scss";

export default function ReposWindow() {
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
