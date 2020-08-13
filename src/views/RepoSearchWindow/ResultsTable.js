import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "react95";

import RepoButton from "../../components/RepoButton";
import Loading from "../../components/Loading";

import formatDate from "../../utilities/formatDate";

export default function ResultsTable({ data, loadingPage }) {
  return (
    <>
      <Table className="table">
        <TableHead>
          <TableRow head>
            <TableHeadCell className="table__headCell">Details</TableHeadCell>
            <TableHeadCell className="table__headCell -fixedWidth">
              Main language
            </TableHeadCell>
            <TableHeadCell className="table__headCell -fixedWidth">
              Updated
            </TableHeadCell>
            <TableHeadCell className="table__headCell -fixedWidth -small">
              Link
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map(
              ({
                name,
                owner: { login },
                description,
                url,
                id,
                pushedAt,
                isFork,
                primaryLanguage,
                repositoryTopics,
              }) => (
                <TableRow key={id} className="table__bodyRow">
                  <TableDataCell className="table__bodyCell">
                    <p className="fontSize14">
                      {name}
                      {isFork && <span className="badge -grey">Fork</span>}
                    </p>
                    <p>{description}</p>
                    {repositoryTopics.nodes.length > 0 && (
                      <div className="searchResults__tableBadges">
                        {repositoryTopics.nodes.map(({ topic }) => (
                          <p
                            className="badge -small -textBlack"
                            key={id + topic.name}
                          >
                            {topic.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </TableDataCell>
                  <TableDataCell className="table__bodyCell">
                    {primaryLanguage !== null ? (
                      <p className={`languageBadge -${primaryLanguage.name}`}>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: primaryLanguage.color,
                          }}
                        ></span>
                        {primaryLanguage.name}
                      </p>
                    ) : (
                      <p>-</p>
                    )}
                  </TableDataCell>
                  <TableDataCell className="table__bodyCell">
                    {formatDate(pushedAt)}
                  </TableDataCell>
                  <TableDataCell className="pl1 table__bodyCell -small">
                    <RepoButton name={name} owner={login} />
                  </TableDataCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
      {loadingPage && <Loading message="Loading page" />}
    </>
  );
}
