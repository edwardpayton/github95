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
  placeholder,
  searchValue,
  onSearch,
  searchMatches,
  onClickMatch,
  onBack,
  onForward,
  historyList,
}) {
  const [menuVisible, setVisible] = React.useState(false);

  const handleClickMatch = (match) => () => {
    onClickMatch(match);
  };

  const handleToggleMenu = () => setVisible(!menuVisible);

  const handleClickHistory = (name) => () => {
    onClickMatch(name);
  };

  return (
    <>
      <div className="flex justify-between toolbar">
        <div className="flex justify-between toolbar__buttons">
          <Button onClick={onBack}>{"<"} Back</Button>
          <Button onClick={onForward}>Fwd {">"}</Button>
        </div>
        <div className="toolbar__search">
          <Search
            placeholder={placeholder}
            initalValue={searchValue}
            onSearch={onSearch}
            className="userSearch__input"
          />
        </div>
        <div className="toolbar__history">
          <Button onClick={handleToggleMenu} active={menuVisible}>
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
      <div className="searchMatches">
        {searchMatches.length > 0 && (
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
      <Divider />
    </>
  );
}
