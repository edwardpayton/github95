import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Button,
  Hourglass,
} from "react95";
import { useRecoilState } from "recoil";

import { userSearchInput, userSearchMatches } from "../../store";

import SearchInput from "../SearchInput";

import useGithubApi from "../../githubApi";

export default function Search() {
  const [input, setInput] = useRecoilState(userSearchInput);
  const [matches, setMatches] = useRecoilState(userSearchMatches);
  const refSearchCard = React.useRef(undefined);

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

  const handleClickOutside = ({ target }) => {
    const clickedWithin = refSearchCard.current.contains(target);
    if (!clickedWithin) {
      setMatches([]);
    }
  };

  React.useEffect(() => {
    if (matches.length > 0) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [matches]);

  return (
    <div className="card userSearch" ref={refSearchCard}>
      <SearchInput
        labelText="Username"
        placeholder="eg: edwardpayton"
        defaultValue={input}
        onSearch={handleSearch}
        className="userSearch__input"
      />
      {matches.length > 0 && (
        <div className="scrollable -yOnly userSearch__matches">
          <Table className="table">
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.login}>
                  <TableDataCell className="flex justify-between userSearch__match">
                    <p>
                      {match.name}
                      <span className="userSearch__login">{match.login}</span>
                    </p>
                    <Button
                      onClick={handleClickMatch(match.login)}
                      className="userSearch__button"
                    >
                      Open profile
                    </Button>
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
