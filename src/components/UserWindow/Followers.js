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
import { searchInputOfType } from "../../store";
import { USER } from "../../constants";

export default function Followers({ followers, total, url }) {
  const setSearch = useSetRecoilState(searchInputOfType(USER));

  const handleClick = (login) => () => {
    setSearch(login);
  };

  return (
    <div className="userFollowers">
      <h3>Followers</h3>
      {followers && followers.length > 0 ? (
        <>
          <Table className="table">
            <TableBody>
              {followers.map(({ name, avatarUrl, login, url }) => (
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
