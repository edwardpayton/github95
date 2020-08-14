import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Tooltip,
  Button,
  Hourglass,
} from "react95";
import { useRecoilState, useRecoilValue } from "recoil";

import SearchInput from "../../components/SearchInput";

import {
  userApiStatus,
  searchInputOfType,
  searchResultsOfType,
  currentRecordOfType,
  usersListObj,
} from "../../store";
import { useUserApi } from "../../githubApi";
import { USER } from "../../constants";

import "../../components/SearchInput/styles.scss";

export default function Header() {
  const [input, setInput] = useRecoilState(searchInputOfType(USER));
  const [results, setResults] = useRecoilState(searchResultsOfType(USER));
  const userList = useRecoilValue(usersListObj);
  const [currentUser, setCurrentUser] = useRecoilState(
    currentRecordOfType(USER)
  );
  const { searching } = useRecoilValue(userApiStatus);
  const [historyVisible, setHistoryVisible] = React.useState(false);
  const [resultsVisible, setResultsVisible] = React.useState(false);
  const refSearch = React.useRef(false);
  const refLoaded = React.useRef(false);
  const refResults = React.useRef(undefined);
  const refHistory = React.useRef(undefined);

  const { getUserSearchResults, getUserProfile } = useUserApi();

  const handleToggleMenu = () => setHistoryVisible(!historyVisible);

  const handleClickOnResult = (result) => () => {
    handleClickSearchResult(result);
  };

  const handleClickHistory = (name) => () => {
    handleClickSearchResult(name);
  };

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

  const disabledBack = () => {
    const [first] = Object.keys(userList).slice(0, 1);
    if (
      Object.keys(userList).length === 0 ||
      results.length > 0 ||
      input === first
    )
      return true;
    return false;
  };

  const disabledFwd = () => {
    const [last] = Object.keys(userList).slice(-1);
    if (
      Object.keys(userList).length === 0 ||
      results.length > 0 ||
      input === last
    )
      return true;
    return false;
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

  const handleClickOutsideResults = ({ target }) => {
    const clickedResults = refResults.current.contains(target);
    if (!clickedResults) {
      setResultsVisible(false);
      document.removeEventListener("click", handleClickOutsideResults);
    }
  };

  const handleClickOutsideHistory = ({ target }) => {
    const clickedHistory = refHistory.current.contains(target);
    if (!clickedHistory) {
      setHistoryVisible(false);
      document.removeEventListener("click", handleClickOutsideHistory);
    }
  };

  React.useEffect(() => {
    refLoaded.current = true;
  }, []);

  React.useEffect(() => {
    if (searching) setResultsVisible(true);
  }, [searching]);

  React.useEffect(() => {
    // TODO this logic is to trigger getUserProfile on two scenarios - on clicking a result, on clicking a follower/ing user. It is a clumsy way around it, can be refactored
    if (refSearch.current === false && refLoaded.current === true) {
      getUserProfile(input);
    }
  }, [input]);

  React.useEffect(() => {
    if (results.length > 0) {
      document.addEventListener("click", handleClickOutsideResults);
      setResultsVisible(true);
    } else {
      document.removeEventListener("click", handleClickOutsideResults);
      setResultsVisible(false);
    }
  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (historyVisible) {
      document.addEventListener("click", handleClickOutsideHistory);
      setHistoryVisible(true);
    }
  }, [historyVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="flex justify-between header">
      <div className="flex header__buttons">
        <Tooltip text="Back" delay={250}>
          <Button
            onClick={handleClickBack}
            disabled={disabledBack()}
            className={`header__button -nav -back${
              disabledBack() ? " -disabled" : ""
            }`}
          >
            {""}
          </Button>
        </Tooltip>
        <Tooltip text="Forward" delay={250}>
          <Button
            onClick={handleClickFwd}
            disabled={disabledFwd()}
            className={`header__button -nav -forward${
              disabledFwd() ? " -disabled" : ""
            }`}
          >
            {""}
          </Button>
        </Tooltip>
        <Button
          onClick={handleToggleMenu}
          active={historyVisible}
          disabled={!Object.keys(userList).length}
          className="header__button -history"
        >
          History
        </Button>
        <div
          className={`searchHistory${historyVisible ? " -visible" : ""}`}
          ref={refHistory}
        >
          <div className="card searchHistory__inner">
            {Object.keys(userList).map((item) => (
              <Button
                key={item}
                onClick={handleClickHistory(item)}
                className={`searchHistory__button${
                  item === input ? " -current" : ""
                }`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="header__title">
        <h1>User Profiles</h1>
      </div>

      <div className="flex justify-center header__search">
        <SearchInput
          placeholder="Search with login or name"
          initalValue={input}
          onSearch={handleSearch}
        />
        <div className="searchResultsOverlay" ref={refResults}>
          {resultsVisible && (
            <div className="card searchResultsOverlay__panel">
              <div className="scrollable -yOnly searchResultsOverlay__inner">
                {searching ? (
                  <div className="pt4 flex flex-column items-center">
                    <Hourglass />
                    <p>Searching</p>
                  </div>
                ) : (
                  <Table className="table">
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.login}>
                          <TableDataCell className="flex justify-between searchResultsOverlay__row">
                            <p>
                              {row.name}
                              <span className="searchResultsOverlay__login">
                                {row.login}
                              </span>
                            </p>
                            <Button
                              onClick={handleClickOnResult(row.login)}
                              className="searchResultsOverlay__button"
                            >
                              Open profile
                            </Button>
                          </TableDataCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
