import React from "react";
import { useRecoilValue } from "recoil";
import { Tabs, Tab, TabBody, Hourglass } from "react95";

import Topic from "./Topic";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";

import { searchInputOfType, searchResultsOfType } from "../../store";
import { REPOS } from "../../constants";
import { useReposApi } from "../../githubApi";

import "./styles.scss";

export default function ReposWindow() {
  const input = useRecoilValue(searchInputOfType(REPOS));
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const [activeTab, setActiveTab] = React.useState(0);
  const refSort = React.useRef("");

  const { getRepoSearchResults } = useReposApi();

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

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
      <div className="flex flex-column repoWindow__content">
        <div className="repoTabs">
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab value={0} className="repoTabs__tab">
              <p>All</p>
            </Tab>
            <Tab value={1} className="repoTabs__tab">
              <p>Hottest</p>
            </Tab>
            <Tab value={2} className="repoTabs__tab">
              <p>Trending</p>
            </Tab>
          </Tabs>
        </div>

        <TabBody className="repoTabs__tabBody tab">
          <section
            className="flex flex-column repoTab__content"
            style={{ display: activeTab === 0 ? "flex" : "none" }}
          >
            <div className="repoTab__header">
              <h1>Find Repositories By Name</h1>
              <div className="flex">
                <p className="badge">{results.repositoryCount} results</p>
                <Searchbar
                  placeholder="Repository name"
                  onSearch={handleSearch}
                />
                <Filter onChange={handleSort} />
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
          </section>
        </TabBody>
      </div>
    </>
  );
}
