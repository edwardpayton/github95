import React from "react";
import { useRecoilValue } from "recoil";

import Pagination from "../../components/Pagination";
import Topic from "./Topic";
import ResultsTable from "./ResultsTable";

import {
  searchResultsOfType,
  currentRecordOfType,
  reposSort,
} from "../../store";
import { REPOS } from "../../constants";

export default function SearchResults({ onPageChange }) {
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const currentRepo = useRecoilValue(currentRecordOfType(REPOS));
  const sort = useRecoilValue(reposSort);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);
  const refCurrent = React.useRef("");
  const refSort = React.useRef("");
  const refResults = React.useRef(undefined);

  React.useEffect(() => {
    refResults.current.scrollTop = 0;
  }, [results]);

  React.useEffect(() => {
    if (results.nodes === undefined || !results.nodes.length) return;
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
      <div ref={refResults} className="scrollable -yOnly searchResults__body">
        {paginated && paginated.length > 0 ? (
          <>
            <Topic />
            <ResultsTable data={paginated[pageNumber]} />
          </>
        ) : (
          <p className="mt4 center">Search for repositories</p>
        )}
      </div>
      <div className="relative flex items-center pl1 searchResults__footer">
        {results.repositoryCount && <p>{results.repositoryCount} results</p>}
        {results.repositoryCount > 20 && (
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
