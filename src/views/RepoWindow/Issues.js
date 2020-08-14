import React from "react";
import PropTypes from "prop-types";

import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  Anchor,
  Hourglass,
} from "react95";

import AnchorButton from "../../components/AnchorButton";
import formatDate from "../../utilities/formatDate";

export default function Issues({ data }) {
  if (!data) {
    return (
      <div className="py4 center">
        <Hourglass />
      </div>
    );
  }

  if (
    data &&
    Object.keys(data).length &&
    data.mostCommented7Days &&
    data.mostCommented7Days.edges.length === 0 &&
    data.latest &&
    data.latest.edges.length === 0
  ) {
    return (
      <div className="py4 center">
        <p>No issues</p>
      </div>
    );
  }

  return (
    <div className="issues">
      {data.mostCommented7Days.edges.length > 0 && (
        <>
          <h3 className="mt1 mb2 flex items-top">
            Top commented Issues in last seven days
            <span className="badge -grey">Top three commented</span>
          </h3>
          <IssuesList issues={data.mostCommented7Days.edges} />
        </>
      )}
      {data.latest.edges.length > 0 && (
        <>
          <h3 className="my2 mb flex items-top">
            Latest Issues
            <span className="badge -grey">10 latest</span>
          </h3>
          <IssuesTable issues={data.latest.edges} />
        </>
      )}
    </div>
  );
}

function IssuesList({ issues }) {
  return (
    <ul className="mb3 issues__list">
      {issues.map(
        ({
          node: { id, title, author, comments, createdAt, updatedAt, url },
        }) => (
          <li key={id} className="mt2 issues__listItem">
            <div className="flex justify-between">
              <p className="flex items-baseline issues__titleWrapper">
                <span className="issues__title">{title}</span>
                <span className="badge -grey issues__login">
                  {author.login}
                </span>
              </p>

              <AnchorButton href={url} className="issues__listLink">
                Open on github.com
              </AnchorButton>
            </div>
            <div className="mt2 flex">
              <div className="badge -small -textBlack">
                Created: {formatDate(createdAt)}
              </div>
              <div className="badge -small -textBlack">
                Updated: {formatDate(updatedAt)}
              </div>
              <div className="badge -small -textBlack">
                Comments: {comments.totalCount}
              </div>
            </div>
            {comments.edges.length > 0 &&
              Object.keys(comments.edges[0].node).length > 0 && (
                <div className="mt2 issues__comment">
                  <Anchor
                    href={comments.edges[0].node.url}
                    target="_blank"
                    className="issues__commentLink"
                  >
                    <p className="issues__commentTitle">
                      Latest comment on{" "}
                      {formatDate(comments.edges[0].node.updatedAt, {
                        time: true,
                      })}{" "}
                      by {comments.edges[0].node.author.login}
                    </p>
                  </Anchor>

                  <div className="issues__commentBody">
                    <div
                      className={`pullRequests__commentText${
                        comments.edges[0].node.bodyText.length > 300
                          ? " -fade"
                          : ""
                      }`}
                    >
                      {comments.edges[0].node.bodyText}
                    </div>
                  </div>
                </div>
              )}
          </li>
        )
      )}
    </ul>
  );
}

function IssuesTable({ issues }) {
  return (
    <Table className="table issues__table">
      <TableBody>
        {issues.map(
          ({
            node: { id, title, author, comments, createdAt, updatedAt, url },
          }) => (
            <TableRow key={id} className="table__bodyRow">
              <TableDataCell className="table__bodyCell issues__tableCell">
                <p className="flex items-baseline issues__titleWrapper">
                  <span className="issues__title">{title}</span>
                  <span className="badge -grey issues__login">
                    {author.login}
                  </span>
                </p>
                <div>
                  <div className="badge -small -textBlack">
                    Created: {formatDate(createdAt)}
                  </div>
                  <div className="badge -small -textBlack">
                    Updated: {formatDate(updatedAt)}
                  </div>
                  <div className="badge -small -textBlack">
                    Comments: {comments.totalCount}
                  </div>
                </div>
              </TableDataCell>
              <TableDataCell className="table__bodyCell issues__tableCell">
                <AnchorButton href={url}>Open on github.com</AnchorButton>
              </TableDataCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

Issues.propTypes = {
  data: PropTypes.object,
};

Issues.defaultProps = {
  data: undefined,
};
