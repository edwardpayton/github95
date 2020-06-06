import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Button,
  Divider,
} from "react95";

import Search from "./Search";

import "./styles.scss";

export default function Toolbar({
  label,
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

  const handleClickOutside = ({ target }) => {
    const clickedMatches = refMatches.current.contains(target);
    if (!clickedMatches) {
      setMatchesVisible(false);
    }
  };

  React.useEffect(() => {
    if (searchMatches.length > 0) {
      document.addEventListener("click", handleClickOutside);
      setMatchesVisible(true);
    } else {
      document.removeEventListener("click", handleClickOutside);
      setMatchesVisible(false);
    }
  }, [searchMatches]);

  return (
    <>
      <div className="flex justify-between toolbar">
        <div className="flex justify-between toolbar__buttons">
          <Button
            onClick={onBack}
            disabled={disabledBack()}
            className={`toolbar__button -back${
              disabledBack() ? " -disabled" : ""
            }`}
          >
            Back
          </Button>
          <Button
            onClick={onForward}
            disabled={disabledFwd()}
            className={`toolbar__button${disabledFwd() ? " -disabled" : ""}`}
          >
            Forward
          </Button>
        </div>
        <div className="bevelBorder flex justify-center toolbar__search">
          <label htmlFor={label.replace(/\s/g, "")}>{label}</label>
          <Search
            id={label.replace(/\s/g, "")}
            placeholder={placeholder}
            initalValue={searchValue}
            onSearch={onSearch}
            className="userSearch__input"
          />
          <div className="searchMatches" ref={refMatches}>
            {matchesVisible && (
              <div className="card searchMatches__panel">
                <div className="scrollable -yOnly searchMatches__inner">
                  <Table className="table">
                    <TableBody>
                      {searchMatches.map((match) => (
                        <TableRow key={match.login}>
                          <TableDataCell className="flex justify-between userMatches__match">
                            <p>
                              {match.name}
                              <span className="userMatches__login">
                                {match.login}
                              </span>
                            </p>
                            <Button
                              onClick={handleClickMatch(match.login)}
                              className="userMatches__button"
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
        <div className="toolbar__history">
          <Button
            onClick={handleToggleMenu}
            active={menuVisible}
            disabled={!historyList.length}
          >
            History
          </Button>
          <div
            className={`card searchHistory${menuVisible ? " -visible" : ""}`}
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
      </div>
      <Divider />
    </>
  );
}
