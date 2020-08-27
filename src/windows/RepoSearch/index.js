import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";

import {
  searchInputOfType,
  searchResultsOfType,
  currentRecordOfType,
  windowObj,
  reposSort,
  reposSearchTopic,
} from "../../store";
import { REPOS } from "../../constants";
import { useReposApi } from "../../githubApi";

import "./styles.scss";

export default function RepoSearch() {
  const [currentRepo, setCurrentRepo] = useRecoilState(
    currentRecordOfType(REPOS)
  );
  const currentWindows = useRecoilValue(windowObj);
  const input = useRecoilValue(searchInputOfType(REPOS));
  const [results, setResults] = useRecoilState(searchResultsOfType(REPOS));
  const sort = useRecoilValue(reposSort);
  const setTopic = useSetRecoilState(reposSearchTopic);

  const { getRepoSearchResults } = useReposApi();

  const handlePageChange = () => {
    const { endCursor } = results.pageInfo;
    getRepoSearchResults(input, sort, endCursor);
  };

  React.useEffect(() => {
    if (currentRepo && !currentWindows.repos.visibility[0]) {
      // Clear active repo on window close
      setCurrentRepo(null);
      setResults([]);
      setTopic({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindows.repos]);
  // 'currentRepo', 'setCurrentRepo', 'setResults', 'setTopic' - not needed

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
