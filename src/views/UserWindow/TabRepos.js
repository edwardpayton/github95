import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "react95";

import RepoButton from "../../components/RepoButton";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

import { currentRecordOfType } from "../../store";
import formatDate from "../../utilities/formatDate";
import { USER } from "../../constants";

export default function TabRepos({ repos, total, onPageChange }) {
  const currentUser = useRecoilValue(currentRecordOfType(USER));
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

  React.useEffect(() => {
    setPageNumber(0);
  }, [currentUser]);

  return (
    <div className="userRepos">
      {paginated && paginated.length > 0 ? (
        <>
          <Table className="table userRepos__table">
            <TableHead>
              <TableRow head>
                <TableHeadCell className="table__headCell">
                  Details
                </TableHeadCell>
                <TableHeadCell className="table__headCell -fixedWidth">
                  Main language
                </TableHeadCell>
                <TableHeadCell className="table__headCell -fixedWidth">
                  Updated
                </TableHeadCell>
                <TableHeadCell className="table__headCell -fixedWidth">
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
                    <TableRow key={cursor} className="table__bodyRow">
                      <TableDataCell className="table__bodyCell">
                        <p className="fontSize14">
                          {name}
                          {isFork && (
                            <span className="badge -grey -textBlack">Fork</span>
                          )}
                        </p>
                        <p className="userRepos__repoDesc">{description}</p>
                        {repositoryTopics.nodes.length > 0 && (
                          <div>
                            {repositoryTopics.nodes.map(({ topic }) => (
                              <p
                                className="badge -small -textBlack"
                                key={cursor + topic.name}
                              >
                                {topic.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </TableDataCell>
                      <TableDataCell className="table__bodyCell">
                        {primaryLanguage !== null ? (
                          <p
                            className={`languageBadge -textBlack -${primaryLanguage.name}`}
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
                      <TableDataCell className="table__bodyCell">
                        {formatDate(updatedAt)}
                      </TableDataCell>
                      <TableDataCell className="pl1 table__bodyCell">
                        <RepoButton name={name} owner={currentUser.login} />
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
        <Loading message="Loading results" />
      )}
    </div>
  );
}
