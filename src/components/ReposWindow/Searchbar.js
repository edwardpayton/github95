import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TextField, Button } from "react95";

import { searchInputOfType, currentRecordOfType } from "../../store";
import { REPOS } from "../../constants";
import { useReposApi } from "../../githubApi";

export default function Searchbar({ placeholder, onSearch }) {
  const [input, setInput] = useRecoilState(searchInputOfType(REPOS));
  const setCurrentRepo = useSetRecoilState(currentRecordOfType(REPOS));

  const { getRepoSearchResults } = useReposApi();

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleClick = () => {
    if (input.length) {
      getRepoSearchResults(input);
      setCurrentRepo(input);
      onSearch();
    }
  };

  return (
    <div className="flex searchBar">
      <TextField
        value={input}
        placeholder={placeholder}
        onChange={handleChange}
        className="searchForm__input"
      />
      <Button onClick={handleClick} className="searchForm__button">
        Search
      </Button>
    </div>
  );
}
