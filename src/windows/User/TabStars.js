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

import { userApiStatus, currentRecordOfType } from "../../store";
import formatDate from "../../utilities/formatDate";
import { USER } from "../../constants";

export default function TabStars({ stars, total, onPageChange }) {
  const currentUser = useRecoilValue(currentRecordOfType(USER));
  const { gettingPage } = useRecoilValue(userApiStatus);
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
      {paginated && paginated.length > 0 && (
        <Table className="table">
          <TableHead>
            <TableRow head>
              <TableHeadCell className="table__headCell">Details</TableHeadCell>
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
                    owner,
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
                      <RepoButton name={name} owner={owner.login} />
                    </TableDataCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      )}
      {gettingPage && <Loading message="" />}

      <div style={{ visibility: gettingPage ? "hidden" : "visible" }}>
        {total > 20 && (
          <Pagination onPageChange={handleClickNextPage} totalCount={total} />
        )}
      </div>
    </div>
  );
}

TabStars.propTypes = {
  stars: PropTypes.array,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

TabStars.defaultProps = {
  stars: undefined,
};
