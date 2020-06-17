import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Anchor,
  Button,
} from "react95";
import AnchorButton from "../AnchorButton";
import { useSetRecoilState } from "recoil";
import { userSearchInput } from "../../store";

export default function Following({ following, total, url }) {
  const setSearch = useSetRecoilState(userSearchInput);

  const handleClick = (login) => () => {
    setSearch(login);
  };

  return (
    <div className="userFollowers">
      <h3>Following</h3>
      {following && following.length > 0 ? (
        <>
          <Table className="table userFollows__table">
            <TableBody>
              {following.map(({ name, avatarUrl, login, url }) => (
                <TableRow key={name + login}>
                  <TableDataCell className="flex userFollows__cell -details">
                    <img
                      src={avatarUrl}
                      alt=""
                      className="bevelBorder userFollows__avatar"
                    />
                    <div className="userFollows__details">
                      <p className="userFollows__name">
                        {name || "-"}
                        <span className="badge -grey userFollows__login">
                          {login}
                        </span>
                      </p>
                      <Anchor
                        href={url}
                        className="userFollows__link"
                        target="_blank"
                      >
                        {url}
                      </Anchor>
                    </div>
                  </TableDataCell>
                  <TableDataCell className="userFollows__cell -link">
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
        <p>TODO</p>
      )}
    </div>
  );
}
