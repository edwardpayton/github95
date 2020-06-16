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

export default function Stars({ stars, total, onPageChange }) {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);

  const handleClickNextPage = (page) => {
    setPageNumber(page);
    if (!paginated[page]) {
      onPageChange();
    }
  };

  const processStars = React.useCallback(() => {
    let reversed = [...stars].reverse();
    const grouped = reversed.reduce((newArray, item, i) => {
      const groupI = Math.floor(i / 20);
      if (!newArray[groupI]) newArray[groupI] = [];
      newArray[groupI].push(item);
      return newArray;
    }, []);
    return grouped;
  }, [stars]);

  React.useEffect(() => {
    if (stars && stars.length) {
      setPaginated(processStars());
    }
  }, [stars, processStars]);

  return (
    <div className="userRepos">
      <h3>Stars</h3>
      {paginated && paginated.length > 0 ? (
        <>
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
              {paginated[pageNumber] &&
                paginated[pageNumber].map(
                  ({
                    cursor,
                    node: {
                      name,
                      description,
                      url,
                      updatedAt,
                      primaryLanguage,
                      stargazers,
                      forks,
                    },
                  }) => (
                    <TableRow key={cursor}>
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
