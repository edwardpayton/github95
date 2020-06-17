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
import Pagination from "../Pagination";

import formatDate from "../../utilities/formatDate";

export default function Repos({ repos, total, onPageChange }) {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);

  const handleClickNextPage = (page) => {
    setPageNumber(page);
    if (!paginated[page]) {
      onPageChange();
    }
  };

  const processRepos = React.useCallback(() => {
    let reversed = [...repos].reverse();
    const grouped = reversed.reduce((newArray, item, i) => {
      const groupI = Math.floor(i / 20);
      if (!newArray[groupI]) newArray[groupI] = [];
      newArray[groupI].push(item);
      return newArray;
    }, []);
    return grouped;
  }, [repos]);

  React.useEffect(() => {
    if (repos && repos.length) {
      setPaginated(processRepos());
    }
  }, [repos, processRepos]);

  return (
    <div className="userRepos">
      <h3>Repositories</h3>
      {paginated && paginated.length > 0 ? (
        <>
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
              {paginated[pageNumber] &&
                paginated[pageNumber].map(
                  ({
                    cursor,
                    node: {
                      name,
                      isFork,
                      description,
                      url,
                      updatedAt,
                      primaryLanguage,
                      repositoryTopics,
                    },
                  }) => (
                    <TableRow key={cursor}>
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
                                key={cursor + topic.name}
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
                      <TableDataCell className="userRepos__bodyCell">
                        {formatDate(updatedAt)}
                      </TableDataCell>
                      <TableDataCell className="userRepos__bodyCell -link">
                        <AnchorButton
                          href={url}
                          className="userRepos__repoLink"
                        >
                          Go to repo
                        </AnchorButton>
                      </TableDataCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
          {total > 20 && (
            <Pagination onPageChange={handleClickNextPage} totalCount={total} />
          )}
        </>
      ) : (
        <p>TODO</p>
      )}
    </div>
  );
}
