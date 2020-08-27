import React from "react";
import PropTypes from "prop-types";

import { Anchor, Hourglass } from "react95";

import AnchorButton from "../../components/AnchorButton";
import formatDate from "../../utilities/formatDate";

const mergeableMap = {
  CONFLICTING: " -red",
  MERGEABLE: " -blue",
};
const commitStatusMap = {
  ERROR: " -red",
  FAILURE: " -red",
  PENDING: " -blue",
  SUCCESS: " -green",
};

export default function PullRequests({ data }) {
  if (!data) {
    return (
      <div className="py4 center">
        <Hourglass />
      </div>
    );
  }

  if (data && data.edges.length === 0) {
    return (
      <div className="py4 center">
        <p>No pull requests</p>
      </div>
    );
  }

  return (
    <div className="pullRequests">
      <h3 className="mt1">
        Recently updated Pull Requests
        <span className="badge -grey">Top three recently updated</span>
      </h3>
      <ul className="pullRequests__list">
        {data.edges.map(
          ({
            node: {
              id,
              title,
              author,
              commits,
              comments,
              createdAt,
              updatedAt,
              url,
              mergeable,
              locked,
            },
          }) => (
            <li key={id} className="mt2 pullRequests__listItem">
              <div className="flex justify-between">
                <p className="flex items-baseline pullRequests__titleWrapper">
                  <span className="pullRequests__title">{title}</span>
                  <span className="badge -grey pullRequests__login">
                    {author.login}
                  </span>
                </p>

                <AnchorButton href={url} className="pullRequests__listLink">
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
                {mergeableMap[mergeable] !== undefined && (
                  <div
                    className={`badge -small -textBlack${mergeableMap[mergeable]}`}
                  >
                    {mergeable}
                  </div>
                )}
                {locked && (
                  <div className="badge -small -textBlack -red">Locked</div>
                )}
              </div>

              {commits.edges.length > 0 &&
                Object.keys(commits.edges[0].node.commit).length > 0 && (
                  <Commit commit={commits.edges[0].node.commit} />
                )}

              {comments.edges.length > 0 &&
                Object.keys(comments.edges[0].node).length > 0 && (
                  <Comment comment={comments.edges[0].node} />
                )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function Comment({ comment }) {
  return (
    <div className="mt2 pullRequests__comment">
      <Anchor href={comment.url} target="_blank">
        <p className="pullRequests__commentTitle">
          Latest comment on{" "}
          {formatDate(comment.updatedAt, {
            time: true,
          })}{" "}
          by {comment.author.login}
        </p>
      </Anchor>

      <div className="pullRequests__commentBody">
        <div
          className={`pullRequests__commentText${
            comment.bodyText.length > 300 ? " -fade" : ""
          }`}
        >
          {comment.bodyText}
        </div>
      </div>
    </div>
  );
}

function Commit({ commit }) {
  return (
    <div className="mt2 pullRequests__commit">
      <p className="pullRequests__commentTitle">
        <Anchor href={commit.commitUrl} target="_blank">
          Latest commit on{" "}
          {formatDate(commit.pushedDate, {
            time: true,
          })}{" "}
          by {commit.author.user.login}
        </Anchor>
        <span className="ml1 badge -grey -small -textBlack">
          {commit.changedFiles} files changed
        </span>
        {commit.status &&
          commitStatusMap[commit.status.state] !== undefined && (
            <span
              className={`badge -small -textBlack${
                commitStatusMap[commit.status.state]
              }`}
            >
              {commit.status.state}
            </span>
          )}
      </p>

      <div className="pullRequests__commentBody">
        <div
          className={`pullRequests__commentText${
            commit.message.length > 300 ? " -fade" : ""
          }`}
        >
          {commit.message}
        </div>
      </div>
    </div>
  );
}

PullRequests.propTypes = {
  data: PropTypes.object,
};

PullRequests.defaultProps = {
  data: undefined,
};
