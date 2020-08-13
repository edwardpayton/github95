import React from "react";
import { useRecoilValue } from "recoil";

import Searchbar from "./Searchbar";
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
    <section className="flex flex-column repoSearch">
      <Searchbar />
      <div className="flex-auto repoSearch__content">
        <div className="repoSearch__results">
          <SearchResults onPageChange={handlePageChange} />
        </div>
      </div>
    </section>
  );
}
