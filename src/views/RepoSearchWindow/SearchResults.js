import React from "react";
import { useRecoilValue } from "recoil";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
} from "react95";

import Pagination from "../../components/Pagination";
import RepoButton from "../../components/RepoButton";
import Loading from "../../components/Loading";

import {
  searchResultsOfType,
  currentRecordOfType,
  reposSort,
} from "../../store";
import { REPOS } from "../../constants";
import formatDate from "../../utilities/formatDate";

export default function SearchResults({ onPageChange }) {
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const currentRepo = useRecoilValue(currentRecordOfType(REPOS));
  const sort = useRecoilValue(reposSort);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);
  const refCurrent = React.useRef("");
  const refSort = React.useRef("");

  React.useEffect(() => {
    let newArray = [];
    if (refCurrent.current !== currentRepo || refSort.current !== sort) {
      console.log("RepoSearchWindow/SearchResults >>>");
      newArray = [[...results.nodes]];
      setPageNumber(0);
      refCurrent.current = currentRepo;
      refSort.current = sort;
    } else {
      console.log("RepoSearchWindow/SearchResults >>>");
      newArray = [...paginated, [...results.nodes]];
    }
    console.log("RepoSearchWindow/SearchResults >>>", newArray);
    setPaginated(newArray);
  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps
  // 'paginated' - crashes
  // 'currentRecord' & 'currentSort' - extra render, incorrect results

  const handleClickNextPage = (page) => {
    setPageNumber(page);
    if (!paginated[page]) {
      onPageChange();
    }
  };

  return (
    <div className="flex flex-column searchResults">
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
                  Updated
                </TableHeadCell>
                <TableHeadCell className="table__headCell -fixedWidth -small">
                  Link
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated[pageNumber] &&
                paginated[pageNumber].map(
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
                          <p
                            className={`languageBadge -${primaryLanguage.name}`}
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
          {results.repositoryCount > 20 && (
            <Pagination
              onPageChange={handleClickNextPage}
              totalCount={results.repositoryCount}
            />
          )}
        </>
      ) : (
        <Loading message="Searching" />
      )}
    </div>
  );
}
