import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Anchor,
  Hourglass,
} from "react95";

import formatDate from "../../utilities/formatDate";

export default function Repos({ repos }) {
  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="userRepos">
        <h3>Repositories</h3>
        {repos && repos.length > 0 ? (
          <Table className="userRepos__table">
            <TableHead>
              <TableRow head>
                <TableHeadCell className="userRepos__headCell">
                  Details
                </TableHeadCell>
                <TableHeadCell className="userRepos__headCell">
                  Updated
                </TableHeadCell>
                <TableHeadCell className="userRepos__headCell">
                  Link
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repos.map(
                ({
                  name,
                  description,
                  url,
                  updatedAt,
                  primaryLanguage,
                  repositoryTopics,
                }) => (
                  <TableRow key={name}>
                    <TableDataCell className="userRepos__bodyCell">
                      <p className="userRepos__repoName">{name}</p>
                      <p className="userRepos__repoDesc">{description}</p>
                      {repositoryTopics.nodes.length > 0 && (
                        <div className="userRepos__badges">
                          {repositoryTopics.nodes.map(({ topic }) => (
                            <div
                              className="userRepos__badge"
                              key={name + topic.name}
                            >
                              {topic.name}
                            </div>
                          ))}
                        </div>
                      )}

                      {primaryLanguage !== null && (
                        <p
                          className={`userRepos__badge -language -${primaryLanguage.name}`}
                        >
                          <span
                            className="badge"
                            style={{ backgroundColor: primaryLanguage.color }}
                          ></span>
                          {primaryLanguage.name}
                        </p>
                      )}
                    </TableDataCell>
                    <TableDataCell className="userRepos__bodyCell">
                      {formatDate(updatedAt)}
                    </TableDataCell>
                    <TableDataCell className="userRepos__bodyCell">
                      <Anchor href={url} className="userRepos__repoLink">
                        Go to repo
                      </Anchor>
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
    </div>
  );
}
