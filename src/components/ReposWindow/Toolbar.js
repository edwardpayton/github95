import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  userSearchInput,
  userSearchMatches,
  userCurrentNum,
  usersListObj,
} from "../../store";

import Toolbar from "../Toolbar";

import useGithubApi from "../../githubApi";

export default function Search() {
  const [input, setInput] = useRecoilState(userSearchInput);
  const [matches, setMatches] = useRecoilState(userSearchMatches);
  const userList = useRecoilValue(usersListObj);
  const [currentUser, setCurrentUser] = useRecoilState(userCurrentNum);
  const refSearch = React.useRef(false);
  const refLoaded = React.useRef(false);

  const { getUsersMatches, getUserProfile } = useGithubApi();

  React.useEffect(() => {
    // TODO this logic is to trigger getUserProfile on two scenarios - on clicking a match, on clicking a follower/ing user. It is a clumsy way around it, can be refactored
    if (refSearch.current === false && refLoaded.current === true) {
      getUserProfile(input);
    }
  }, [input]);

  React.useEffect(() => {
    refLoaded.current = true;
  }, []);

  const handleSearch = (value) => {
    setInput(value);
    getUsersMatches(value);
    refSearch.current = true;
  };

  const handleClickMatch = (login) => {
    setInput(login);
    setMatches([]);
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
        label="Search repos"
        placeholder="eg: docker, typescript, ..."
        searchValue={input}
        onSearch={handleSearch}
        searchMatches={matches}
        onClickMatch={handleClickMatch}
        onBack={handleClickBack}
        onForward={handleClickFwd}
        historyList={Object.keys(userList)}
      />
    </div>
  );
}