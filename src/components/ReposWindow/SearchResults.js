import React from "react";
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

import Pagination from "../Pagination";
import AnchorButton from "../AnchorButton";

import { searchResultsOfType, currentRecordOfType } from "../../store";
import { REPOS } from "../../constants";
import formatDate from "../../utilities/formatDate";

export default function SearchResults({ onPageChange }) {
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const currentRepo = useRecoilValue(currentRecordOfType(REPOS));
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);
  const refCurrent = React.useRef("");

  React.useEffect(() => {
    let newArray = [];
    if (refCurrent.current !== currentRepo) {
      newArray = [[...results.nodes]];
      setPageNumber(0);
      refCurrent.current = currentRepo;
    } else {
      newArray = [...paginated, [...results.nodes]];
    }
    setPaginated(newArray);
  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps
  // 'paginated' - crashes
  // 'currentRecord' - extra render, incorrect results

  const handleClickNextPage = (page) => {
    setPageNumber(page);
    if (!paginated[page]) {
      onPageChange();
    }
  };

  return (
    <div className="reposResults">
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
                    <TableRow key={id}>
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
                                key={id + topic.name}
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
                        {formatDate(pushedAt)}
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
          {results.repositoryCount > 20 && (
            <Pagination
              onPageChange={handleClickNextPage}
              totalCount={results.repositoryCount}
            />
          )}
        </>
      ) : (
        <p>TODO</p>
      )}
    </div>
  );
}
