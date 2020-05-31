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

export default function Gists({ repos }) {
  return (
    <div className="userContent__bodyInner scrollable -yOnly">
      <div className="userRepos">
        <h3>Repositories</h3>
        {repos && repos.length > 0 ? (
          <Table className="userRepos__table">
            <TableHead>
              <TableRow head>
                <TableHeadCell>Details</TableHeadCell>
                <TableHeadCell>Updated</TableHeadCell>
                <TableHeadCell>Link</TableHeadCell>
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
                    <TableDataCell>
                      <p>{name}</p>
                      <p>{description}</p>
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
                          className={`badge userRepos__badge -language -${primaryLanguage.name}`}
                          data-color={primaryLanguage.color}
                        >
                          {primaryLanguage.name}
                        </p>
                      )}
                    </TableDataCell>
                    <TableDataCell>{formatDate(updatedAt)}</TableDataCell>
                    <TableDataCell>
                      <Anchor href={url}>Go to repo</Anchor>
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
