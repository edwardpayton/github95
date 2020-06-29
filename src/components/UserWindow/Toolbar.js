import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  searchInputOfType,
  searchResultsOfType,
  userCurrentNum,
  usersListObj,
} from "../../store";

import Toolbar from "../Toolbar";

import { useUserApi } from "../../githubApi";
import { USER } from "../../constants";

export default function UserToolbar() {
  const [input, setInput] = useRecoilState(searchInputOfType(USER));
  const [results, setResults] = useRecoilState(searchResultsOfType(USER));
  const userList = useRecoilValue(usersListObj);
  const [currentUser, setCurrentUser] = useRecoilState(userCurrentNum);
  const refSearch = React.useRef(false);
  const refLoaded = React.useRef(false);

  const { getUserSearchResults, getUserProfile } = useUserApi();

  React.useEffect(() => {
    // TODO this logic is to trigger getUserProfile on two scenarios - on clicking a result, on clicking a follower/ing user. It is a clumsy way around it, can be refactored
    if (refSearch.current === false && refLoaded.current === true) {
      getUserProfile(input);
    }
  }, [input]);

  React.useEffect(() => {
    refLoaded.current = true;
  }, []);

  const handleSearch = (value) => {
    getUserSearchResults(value);
    refSearch.current = true;
  };

  const handleClickSearchResult = (login) => {
    setInput(login);
    setResults([]);
    refSearch.current = false;
    getUserProfile(login);
  };

  const handleClickBack = () => {
    const keys = Object.keys(userList);
    const prev = keys.indexOf(currentUser) - 1;
    if (prev < 0) return;
    setCurrentUser(keys[prev]);
    setInput(keys[prev]);
  };

  const handleClickFwd = () => {
    const keys = Object.keys(userList);
    const next = keys.indexOf(currentUser) + 1;
    if (next === keys.length) return;
    setCurrentUser(keys[next]);
    setInput(keys[next]);
  };

  return (
    <div className="userToolbar">
      <Toolbar
        title="User Profiles"
        placeholder="Find user eg. edwardpayton"
        searchValue={input}
        onSearch={handleSearch}
        searchResults={results}
        onClickSearchResult={handleClickSearchResult}
        onBack={handleClickBack}
        onForward={handleClickFwd}
        historyList={Object.keys(userList)}
      />
    </div>
  );
}
