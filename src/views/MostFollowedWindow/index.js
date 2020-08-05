import React from "react";
import { Bar, Button } from "react95";
import { useRecoilValue } from "recoil";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "react95";

import useNewWindow from "../../hooks/useNewWindow";

import { mostFollowed } from "../../store";
import { useReposApi } from "../../githubApi";
import formatDate from "../../utilities/formatDate";
import formatBigNumber from "../../utilities/formatBigNumber";

import "./styles.scss";

export default function MostFollowedWindow() {
  const followed = useRecoilValue(mostFollowed);
  const [shortcuts, setShortcuts] = React.useState([]);

  const { getMostFollowed } = useReposApi();
  const open = useNewWindow();

  const handleClick = (name, owner) => () => {
    open(name, owner);
  };

  React.useEffect(() => {
    getMostFollowed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 'getMostFollowed' not needed

  React.useEffect(() => {
    setShortcuts(followed["edges"]);
  }, [followed]);

  return (
    <>
      <section className="flex flex-column explorerWindow mostFollowedWindow">
        <div className="flex justify-between explorerWindow__header">
          <div className="flex flex-auto items-center explorerWindow__headerButtons">
            <Bar className="explorerWindow__bar" />
            <Button variant="menu" size="sm">
              File
            </Button>
            <Button variant="menu" size="sm">
              Edit
            </Button>
            <Button variant="menu" size="sm">
              View
            </Button>
          </div>
          <div className="flex explorerWindow__logo">
            <div className="explorerWindow__logoBg" />
            <img
              src={`${require("../../assets/win-logo.png")}`}
              alt=""
              width="30"
            />
          </div>
        </div>

        <div className="flex flex-auto">
          <div className="flex flex-wrap scrollable -yOnly">
            <Table className="table userRepos__table">
              <TableHead>
                <TableRow head>
                  <TableHeadCell className="table__headCell mostFollowedWindow__th -first">
                    Name
                  </TableHeadCell>
                  <TableHeadCell className="table__headCell -fixedWidth mostFollowedWindow__th">
                    Size (stars)
                  </TableHeadCell>
                  <TableHeadCell className="table__headCell -fixedWidth mostFollowedWindow__th">
                    Type
                  </TableHeadCell>
                  <TableHeadCell className="table__headCell mostFollowedWindow__th">
                    Modified
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shortcuts &&
                  shortcuts.length > 0 &&
                  shortcuts.map(
                    ({
                      node: {
                        id,
                        name,
                        owner,
                        stargazers,
                        primaryLanguage,
                        pushedAt,
                      },
                    }) => {
                      return (
                        <TableRow
                          key={id}
                          className="table__bodyRow"
                          onClick={handleClick(name, owner.login)}
                        >
                          <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td -first">
                            <img
                              src={require(`../../assets/folder-closed.png`)}
                              className="mostFollowedWindow__tdImg"
                              alt="icon"
                              width="15"
                            />
                            {name}
                          </TableDataCell>
                          <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                            {formatBigNumber(stargazers.totalCount)}
                          </TableDataCell>
                          <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                            {primaryLanguage ? primaryLanguage.name : "-"}
                          </TableDataCell>
                          <TableDataCell className="cursorPointer table__bodyCell mostFollowedWindow__td">
                            {formatDate(pushedAt, { time: true })}
                          </TableDataCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mostFollowedWindow__footer">
          <p>25 items</p>
        </div>
      </section>
    </>
  );
}