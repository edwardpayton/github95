import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Anchor,
  Button,
} from "react95";

import AnchorButton from "../../components/AnchorButton";
import Loading from "../../components/Loading";

import { useSetRecoilState } from "recoil";
import { searchInputOfType } from "../../store";
import { USER } from "../../constants";

export default function TabFollowing({ following, total, url }) {
  const setSearch = useSetRecoilState(searchInputOfType(USER));

  const handleClick = (login) => () => {
    setSearch(login);
  };

  return (
    <div className="userFollowers">
      <h3>Following</h3>
      {following && following.length > 0 ? (
        <>
          <Table className="table">
            <TableBody>
              {following.map(({ name, avatarUrl, login, url }) => (
                <TableRow key={name + login} className="table__bodyRow">
                  <TableDataCell className="flex table__bodyCell">
                    <img
                      src={avatarUrl}
                      alt=""
                      className="bevelBorder userFollows__avatar"
                    />
                    <div className="userFollows__details">
                      <p className="fontSize14">
                        {name || "-"}
                        <span className="badge -grey userFollows__login">
                          {login}
                        </span>
                      </p>
                      <Anchor href={url} target="_blank">
                        {url}
                      </Anchor>
                    </div>
                  </TableDataCell>
                  <TableDataCell className="table__bodyCell -fixedWidth">
                    <Button onClick={handleClick(login)}>Open profile</Button>
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AnchorButton href={`${url}/following`}>
            View all {total} on github.com
          </AnchorButton>
        </>
      ) : (
        <Loading message="Loading results" />
      )}
    </div>
  );
}
