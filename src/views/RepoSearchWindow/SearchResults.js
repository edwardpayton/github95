import React from "react";
import { useRecoilValue } from "recoil";

import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import Topic from "./Topic";
import ResultsTable from "./ResultsTable";

import {
  repoSearchStatus,
  searchResultsOfType,
  currentRecordOfType,
  reposSort,
} from "../../store";
import { REPOS } from "../../constants";

export default function SearchResults({ onPageChange }) {
  const { gettingSearch, gettingTopic, gettingPage } = useRecoilValue(
    repoSearchStatus
  );
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const currentRepo = useRecoilValue(currentRecordOfType(REPOS));
  const sort = useRecoilValue(reposSort);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);
  const refCurrent = React.useRef("");
  const refSort = React.useRef("");
  const refResultsElement = React.useRef(undefined);

  React.useEffect(() => {
    refResultsElement.current.scrollTop = 0;
  }, [results]);

  React.useEffect(() => {
    if (results.nodes === undefined || !results.nodes.length) {
      refCurrent.current = "";
      refSort.current = "";
      return setPaginated([]);
    }
    let newArray = [];
    if (refCurrent.current !== currentRepo || refSort.current !== sort) {
      newArray = [[...results.nodes]];
      setPageNumber(0);
      refCurrent.current = currentRepo;
      refSort.current = sort;
    } else {
      newArray = [...paginated, [...results.nodes]];
    }
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
      <div
        ref={refResultsElement}
        className="scrollable -yOnly searchResults__body"
      >
        {!gettingSearch &&
          (paginated && paginated.length > 0 ? (
            <>
              <Topic />
              <ResultsTable
                data={paginated[pageNumber]}
                loadingPage={gettingPage}
              />
            </>
          ) : (
            <p className="mt4 center">Search for repositories</p>
          ))}
        {gettingSearch && <Loading message="Searching repositories" />}
      </div>
      <div className="relative flex items-center pl1 searchResults__footer">
        {!gettingSearch && results.repositoryCount && (
          <p>{results.repositoryCount} results</p>
        )}
        {!gettingSearch && results.repositoryCount > 20 && (
          <Pagination
            onPageChange={handleClickNextPage}
            totalCount={results.repositoryCount}
            reset={refCurrent.current !== currentRepo}
            className="searchResults__pagination"
          />
        )}
      </div>
    </div>
  );
}
