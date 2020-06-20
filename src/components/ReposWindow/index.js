import React from "react";
import PropTypes from "prop-types";
import { useRecoilState, useRecoilValue } from "recoil";

import Pagination from "../Pagination";

import { reposListObj, reposSearchInput } from "../../store";
import { useReposApi } from "../../githubApi";

import "./styles.scss";

export default function ReposWindow() {
  const [repoList, setList] = useRecoilState(reposListObj);
  const searchInputValue = useRecoilValue(reposSearchInput);

  return (
    <>
      <div className="repoWindow__content">
        <div className="repoContent">Repos</div>
      </div>
    </>
  );
}
