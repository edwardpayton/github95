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
  searchResults,
  onClickSearchResult,
  onBack,
  onForward,
  historyList,
}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [resultsVisible, setResultsVisible] = React.useState(
    searchResults.length > 0
  );
  const refResults = React.useRef(undefined);
  const refHistory = React.useRef(undefined);

  const handleClickOnResult = (result) => () => {
    onClickSearchResult(result);
  };

  const handleToggleMenu = () => setMenuVisible(!menuVisible);

  const handleClickHistory = (name) => () => {
    onClickSearchResult(name);
  };

  const disabledBack = () => {
    const [first] = historyList.slice(0, 1);
    if (
      historyList.length === 0 ||
      searchResults.length > 0 ||
      searchValue === first
    )
      return true;
    return false;
  };

  const disabledFwd = () => {
    const [last] = historyList.slice(-1);
    if (
      historyList.length === 0 ||
      searchResults.length > 0 ||
      searchValue === last
    )
      return true;
    return false;
  };

  const handleClickOutsideResults = ({ target }) => {
    const clickedResults = refResults.current.contains(target);
    if (!clickedResults) {
      document.removeEventListener("click", handleClickOutsideResults);
      setResultsVisible(false);
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
    if (searchResults.length > 0) {
      document.addEventListener("click", handleClickOutsideResults);
      setResultsVisible(true);
    } else {
      document.removeEventListener("click", handleClickOutsideResults);
      setResultsVisible(false);
    }
  }, [searchResults]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="searchResultsOverlay" ref={refResults}>
          {resultsVisible && (
            <div className="card searchResultsOverlay__panel">
              <div className="scrollable -yOnly searchResultsOverlay__inner">
                <Table className="table">
                  <TableBody>
                    {searchResults.map((row) => (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
