import React from "react";
import { Tooltip, Button } from "react95";
import { useRecoilState } from "recoil";

import { userSearchInput, userSearchMatches } from "../../store";

import SearchInput from "../SearchInput";

import useGithubApi from "../../githubApi";

export default function Search() {
  const [input, setInput] = useRecoilState(userSearchInput);
  const [matches, setMatches] = useRecoilState(userSearchMatches);

  const { getUsersMatches, getUserProfile } = useGithubApi();

  const handleSearch = (value) => {
    setInput(value);
    getUsersMatches(value);
  };

  const handleClickMatch = (login) => () => {
    setInput(login);
    setMatches([]);
    getUserProfile(login);
  };

  return (
    <div className="card -bgWhite userSearch">
      <SearchInput
        labelText="Username"
        placeholder="eg: edwardpayton"
        defaultValue={input}
        onSearch={handleSearch}
        className="userSearch__input"
      />
      {matches.length > 0 && (
        <div className="userSearch__matches">
          {matches.map((match) => (
            <Tooltip text={match.login} delay={0}>
              <Button onClick={handleClickMatch(match.login)}>
                {match.name}
              </Button>
            </Tooltip>
          ))}
          <p className="userSearch__footer">
            Haven't found who you're looking for?
            <br /> Try narrowing down your search.
          </p>
        </div>
      )}
    </div>
  );
}
