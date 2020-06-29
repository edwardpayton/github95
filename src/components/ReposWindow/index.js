import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "react95";
import { useRecoilState, useRecoilValue } from "recoil";

import Pagination from "../Pagination";

import {
  reposListObj,
  searchInputOfType,
  searchResultsOfType,
} from "../../store";
import { useReposApi } from "../../githubApi";
import { REPOS } from "../../constants";

import "./styles.scss";

export default function ReposWindow() {
  const [repoList, setList] = useRecoilState(reposListObj);
  const [input, setInput] = useRecoilState(searchInputOfType(REPOS));
  const [input, setInput] = useRecoilState(searchResultsOfType(REPOS));

  const { getRepoSearchResults } = useReposApi();

  const handleChange = ({ target }) => {
    setInput(target.value.trim());
  };

  const handleClick = () => {
    input.length && getRepoSearchResults(input);
  };

  return (
    <>
      <div className="repoWindow__content">
        <TextField
          value={input}
          onChange={handleChange}
          className="searchForm__input"
        />
        <Button onClick={handleClick} className="searchForm__button">
          Search
        </Button>
        <div className="repoContent">Repos</div>
      </div>
    </>
  );
}
