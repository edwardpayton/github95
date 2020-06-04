import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Hourglass,
} from "react95";
import AnchorButton from "../AnchorButton";

import formatDate from "../../utilities/formatDate";

export default function Stars({ stars }) {
  return (
    <div className="userRepos">
      <h3>Stars</h3>
      {stars && stars.length > 0 ? (
        <Table className="table userRepos__table">
          <TableHead>
            <TableRow head>
              <TableHeadCell>Details</TableHeadCell>
              <TableHeadCell className="userRepos__headCell -language">
                Main language
              </TableHeadCell>
              <TableHeadCell className="userRepos__headCell -link">
                Link
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stars.map(
              ({
                name,
                description,
                url,
                updatedAt,
                primaryLanguage,
                stargazers,
                forks,
              }) => (
                <TableRow key={name}>
                  <TableDataCell>
                    <p className="userRepos__repoName">{name}</p>
                    <p className="userRepos__repoDesc">{description}</p>
                    <div className="userRepos__badges">
                      <div className="badge -small userRepos__badge">
                        Stars: {stargazers.totalCount || 0}
                      </div>
                      <div className="badge -small userRepos__badge">
                        Forks: {forks.totalCount || 0}
                      </div>
                      <div className="badge -small userRepos__badge">
                        Updated: {formatDate(updatedAt)}
                      </div>
                    </div>
                  </TableDataCell>
                  <TableDataCell>
                    {primaryLanguage !== null ? (
                      <p
                        className={`userRepos__badge -language -${primaryLanguage.name}`}
                      >
                        <span
                          className="badge"
                          style={{ backgroundColor: primaryLanguage.color }}
                        ></span>
                        {primaryLanguage.name}
                      </p>
                    ) : (
                      <p>-</p>
                    )}
                  </TableDataCell>
                  <TableDataCell>
                    <AnchorButton href={url} target="_blank">
                      Go to repo
                    </AnchorButton>
                  </TableDataCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      ) : (
        <p>TODO</p>
      )}
    </div>
  );
}
