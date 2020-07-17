import React from "react";
import { useRecoilValue } from "recoil";

import Searchbar from "./Searchbar";
import Sort from "./Sort";
import Topic from "./Topic";
import SearchResults from "./SearchResults";

import { searchInputOfType, searchResultsOfType } from "../../store";
import { REPOS } from "../../constants";
import { useReposApi } from "../../githubApi";

export default function TabAll() {
  const input = useRecoilValue(searchInputOfType(REPOS));
  const results = useRecoilValue(searchResultsOfType(REPOS));

  const refSort = React.useRef("");

  const { getRepoSearchResults } = useReposApi();

  const handleSort = (sort) => {
    getRepoSearchResults(input, sort);
    refSort.current = sort;
  };

  const handlePageChange = () => {
    const { endCursor } = results.pageInfo;
    getRepoSearchResults(input, refSort.current, endCursor);
  };

  const handleSearch = () => {
    refSort.current = "";
  };

  return (
    <>
      <div className="repoTab__header tabAll">
        <h1>Find Repositories By Name</h1>
        <div className="flex justify-between card repoTab__toolbar">
          <Searchbar placeholder="Repository name" onSearch={handleSearch} />
          <Sort onChange={handleSort} />
          <p className="badge -grey">
            {results.repositoryCount && results.repositoryCount + " results"}
          </p>
        </div>
      </div>
      <div className="flex-auto repoTab__body">
        {results.nodes && results.nodes.length > 0 && (
          <div className="scrollable -yOnly repoTab__results">
            <Topic />
            <SearchResults onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  );
}
