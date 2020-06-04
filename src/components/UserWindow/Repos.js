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

export default function Repos({ repos }) {
  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="userRepos">
        <h3>Repositories</h3>
        {repos && repos.length > 0 ? (
          <Table className="table userRepos__table">
            <TableHead>
              <TableRow head>
                <TableHeadCell className="userRepos__headCell -details">
                  Details
                </TableHeadCell>
                <TableHeadCell className="userRepos__headCell -language">
                  Main language
                </TableHeadCell>
                <TableHeadCell className="userRepos__headCell -updated">
                  Updated
                </TableHeadCell>
                <TableHeadCell className="userRepos__headCell -link">
                  Link
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repos.map(
                ({
                  name,
                  isFork,
                  description,
                  url,
                  updatedAt,
                  primaryLanguage,
                  repositoryTopics,
                }) => (
                  <TableRow key={name}>
                    <TableDataCell className="userRepos__bodyCell">
                      <p className="userRepos__repoName">
                        {name}
                        {isFork && <span className="badge -grey">Fork</span>}
                      </p>
                      <p className="userRepos__repoDesc">{description}</p>
                      {repositoryTopics.nodes.length > 0 && (
                        <div className="userRepos__badges">
                          {repositoryTopics.nodes.map(({ topic }) => (
                            <p
                              className="badge -small userRepos__badge"
                              key={name + topic.name}
                            >
                              {topic.name}
                            </p>
                          ))}
                        </div>
                      )}
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
                    <TableDataCell className="userRepos__bodyCell">
                      {formatDate(updatedAt)}
                    </TableDataCell>
                    <TableDataCell className="userRepos__bodyCell -link">
                      <AnchorButton href={url} className="userRepos__repoLink">
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
    </div>
  );
}
