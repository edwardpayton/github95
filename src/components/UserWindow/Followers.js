import React from "react";
import PropTypes from "prop-types";
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

export default function Followers({ followers, total, url }) {
  const setSearch = useSetRecoilState(userSearchInput);

  const handleClick = (login) => () => {
    setSearch(login);
  };

  return (
    <div className="userFollowers">
      <h3>Followers</h3>
      {followers && followers.length > 0 ? (
        <>
          <Table className="table userFollows__table">
            <TableBody>
              {followers.map(({ name, avatarUrl, login, url }) => (
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
          <AnchorButton href={`${url}/followers`}>
            View all {total} on github.com
          </AnchorButton>
        </>
      ) : (
        <p>TODO</p>
      )}
    </div>
  );
}
