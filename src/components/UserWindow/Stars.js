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
  Hourglass,
} from "react95";
import AnchorButton from "../AnchorButton";
import Pagination from "../Pagination";

import { currentRecordOfType } from "../../store";
import formatDate from "../../utilities/formatDate";
import { USER } from "../../constants";

export default function Stars({ stars, total, onPageChange }) {
  const currentUser = useRecoilValue(currentRecordOfType(USER));
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

  React.useEffect(() => {
    setPageNumber(0);
  }, [currentUser]);

  return (
    <div className="userStars">
      <h3>Stars</h3>
      {paginated && paginated.length > 0 ? (
        <>
          <Table className="table">
            <TableHead>
              <TableRow head>
                <TableHeadCell className="table__headCell">
                  Details
                </TableHeadCell>
                <TableHeadCell className="table__headCell -fixedWidth">
                  Main language
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
                      description,
                      url,
                      updatedAt,
                      primaryLanguage,
                      stargazers,
                      forks,
                    },
                  }) => (
                    <TableRow key={cursor} className="table__bodyRow">
                      <TableDataCell className="table__bodyCell">
                        <p className="fontSize14">{name}</p>
                        <p>{description}</p>
                        <div>
                          <div className="badge -small -textBlack">
                            Stars: {stargazers.totalCount || 0}
                          </div>
                          <div className="badge -small -textBlack">
                            Forks: {forks.totalCount || 0}
                          </div>
                          <div className="badge -small -textBlack">
                            Updated: {formatDate(updatedAt)}
                          </div>
                        </div>
                      </TableDataCell>
                      <TableDataCell className="table__bodyCell">
                        {primaryLanguage !== null ? (
                          <p
                            className={`languageBadge -textBlack -${primaryLanguage.name}`}
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
                      <TableDataCell className="table__bodyCell">
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
