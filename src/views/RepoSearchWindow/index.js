import React from "react";
import { useRecoilValue } from "recoil";

import Searchbar from "./Searchbar";
import Topic from "./Topic";
import SearchResults from "./SearchResults";

import { searchInputOfType, searchResultsOfType, reposSort } from "../../store";
import { REPOS } from "../../constants";
import { useReposApi } from "../../githubApi";

import "./styles.scss";

export default function RepoSearchWindow() {
  const input = useRecoilValue(searchInputOfType(REPOS));
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const sort = useRecoilValue(reposSort);

  const { getRepoSearchResults } = useReposApi();

  const handlePageChange = () => {
    const { endCursor } = results.pageInfo;
    getRepoSearchResults(input, sort, endCursor);
  };

  return (
    <section className="flex flex-column repoSearch__content">
      <Searchbar />
      <div className="flex-auto repoSearch__body">
        {results.nodes && results.nodes.length > 0 && (
          <div className="scrollable -yOnly repoSearch__results">
            <Topic />
            <SearchResults onPageChange={handlePageChange} />
          </div>
        )}
      </div>
      <div className="flex items-center pl1 repoSearch__footer">
        {results.repositoryCount && <p>{results.repositoryCount} results</p>}
      </div>
    </section>
  );
}
