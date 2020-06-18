import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Tooltip,
  Button,
} from "react95";

import Search from "./Search";

import "./styles.scss";

export default function Toolbar({
  title,
  placeholder,
  searchValue,
  onSearch,
  searchMatches,
  onClickMatch,
  onBack,
  onForward,
  historyList,
}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [matchesVisible, setMatchesVisible] = React.useState(
    searchMatches.length > 0
  );
  const refMatches = React.useRef(undefined);
  const refHistory = React.useRef(undefined);

  const handleClickMatch = (match) => () => {
    onClickMatch(match);
  };

  const handleToggleMenu = () => setMenuVisible(!menuVisible);

  const handleClickHistory = (name) => () => {
    onClickMatch(name);
  };

  const disabledBack = () => {
    const [first] = historyList.slice(0, 1);
    if (
      historyList.length === 0 ||
      searchMatches.length > 0 ||
      searchValue === first
    )
      return true;
    return false;
  };

  const disabledFwd = () => {
    const [last] = historyList.slice(-1);
    if (
      historyList.length === 0 ||
      searchMatches.length > 0 ||
      searchValue === last
    )
      return true;
    return false;
  };

  const handleClickOutsideMatches = ({ target }) => {
    const clickedMatches = refMatches.current.contains(target);
    if (!clickedMatches) {
      document.removeEventListener("click", handleClickOutsideMatches);
      setMatchesVisible(false);
    }
  };

  const handleClickOutsideHistory = ({ target }) => {
    const clickedHistory = refHistory.current.contains(target);
    if (!clickedHistory) {
      setMenuVisible(false);
      document.removeEventListener("click", handleClickOutsideHistory);
    }
  };

  React.useEffect(() => {
    if (searchMatches.length > 0) {
      document.addEventListener("click", handleClickOutsideMatches);
      setMatchesVisible(true);
    } else {
      document.removeEventListener("click", handleClickOutsideMatches);
      setMatchesVisible(false);
    }
  }, [searchMatches]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (menuVisible) {
      document.addEventListener("click", handleClickOutsideHistory);
      setMenuVisible(true);
    }
  }, [menuVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="flex justify-between toolbar">
      <div className="flex toolbar__buttons">
        <Tooltip text="Back" delay={250}>
          <Button
            onClick={onBack}
            disabled={disabledBack()}
            className={`toolbar__button -nav -back${
              disabledBack() ? " -disabled" : ""
            }`}
          >
            {""}
          </Button>
        </Tooltip>
        <Tooltip text="Forward" delay={250}>
          <Button
            onClick={onForward}
            disabled={disabledFwd()}
            className={`toolbar__button -nav -forward${
              disabledFwd() ? " -disabled" : ""
            }`}
          >
            {""}
          </Button>
        </Tooltip>
        <Button
          onClick={handleToggleMenu}
          active={menuVisible}
          disabled={!historyList.length}
          className="toolbar__button -history"
        >
          History
        </Button>
        <div
          className={`card searchHistory${menuVisible ? " -visible" : ""}`}
          ref={refHistory}
        >
          {historyList.map((item) => (
            <Button
              key={item}
              onClick={handleClickHistory(item)}
              className={`searchHistory__button${
                item === searchValue ? " -current" : ""
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className="toolbar__title">
        <h1>{title}</h1>
      </div>

      <div className="flex justify-center toolbar__search">
        <Search
          placeholder={placeholder}
          initalValue={searchValue}
          onSearch={onSearch}
        />
        <div className="searchMatches" ref={refMatches}>
          {matchesVisible && (
            <div className="card searchMatches__panel">
              <div className="scrollable -yOnly searchMatches__inner">
                <Table className="table">
                  <TableBody>
                    {searchMatches.map((match) => (
                      <TableRow key={match.login}>
                        <TableDataCell className="flex justify-between searchMatches__match">
                          <p>
                            {match.name}
                            <span className="searchMatches__login">
                              {match.login}
                            </span>
                          </p>
                          <Button
                            onClick={handleClickMatch(match.login)}
                            className="searchMatches__button"
                          >
                            Open profile
                          </Button>
                        </TableDataCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
