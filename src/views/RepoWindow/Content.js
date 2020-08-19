import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, TabBody } from "react95";
import { useRecoilValue } from "recoil";

import AnchorButton from "../../components/AnchorButton";
import FileTree from "../../components/FileTree";
import FilePreview from "./FilePreview";
import Issues from "./Issues";
import Readme from "./Readme";
import PullRequests from "./PullRequests";

import { repoFiles } from "../../store";
import { useReposApi } from "../../githubApi";
import capitalize from "../../utilities/capitalize";
import formatBigNumber from "../../utilities/formatBigNumber";

export default function Content({ content, onTreeClick }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const files = useRecoilValue(repoFiles);
  const refFile = React.useRef("");
  const [fileState, setFile] = React.useState({});
  const refTabsList = React.useRef(new Set([0, 1]));

  const {
    getRepoFileContents,
    getRepoIssues,
    getRepoPullRequests,
  } = useReposApi();

  const handleTabChange = (_, activeTab) => {
    setActiveTab(activeTab);

    if (refTabsList.current.has(activeTab)) return;

    switch (activeTab) {
      case 2: {
        refTabsList.current.add(2);
        return getRepoIssues(content.name, content.owner.login);
      }
      case 3: {
        refTabsList.current.add(3);
        return getRepoPullRequests(content.name, content.owner.login);
      }
      default:
        return;
    }
  };

  const handleFileClick = (file) => {
    refFile.current = `${content.name}${file}`.replace(/[^A-Za-z0-9]/g, "");
    getRepoFileContents(content.name, content.owner.login, file);
  };

  React.useEffect(() => {
    if (files[refFile.current]) {
      setFile(files[refFile.current]);
    }
  }, [files]);

  return (
    <section className="flex flex-column repoWindow__content">
      <div className="flex justify-between repoWindow__header">
        <h1>
          {content.owner.login}/{content.name}
        </h1>
        <div className="flex justify-end">
          <p className="badge -grey">Watchers: {content.watchers.totalCount}</p>
          <p className="badge -grey">Stars: {content.stargazers.totalCount}</p>
          <p className="badge -grey">Forks: {content.forks.totalCount}</p>
          <AnchorButton href={content.url}>Open on github.com</AnchorButton>
        </div>
      </div>
      <div className="repoWindow__tabs">
        <Tabs value={activeTab} onChange={handleTabChange} className="tabs">
          <Tab value={0} className="tabs__tab repoWindow__tab">
            <p>About</p>
          </Tab>
          <Tab value={1} className="tabs__tab repoWindow__tab">
            <p>Files</p>
          </Tab>
          <Tab value={2} className="tabs__tab repoWindow__tab">
            <p>Issues</p>
            <span
              className={`badge -small ${activeTab === 2 ? "-blue" : "-grey"}`}
            >
              {content.issues && formatBigNumber(content.issues.totalCount)}
            </span>
          </Tab>
          <Tab value={3} className="tabs__tab repoWindow__tab">
            <p>Pull Requests</p>
            <span
              className={`badge -small ${activeTab === 3 ? "-blue" : "-grey"}`}
            >
              {content.pullRequests &&
                formatBigNumber(content.pullRequests.totalCount)}
            </span>
          </Tab>
        </Tabs>
      </div>

      <TabBody className="relative repoWindow__tabBody tab">
        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 0 ? "flex" : "none" }}
        >
          <div className="repoWindow__about scrollable -yOnly">
            <div className="repoWindow__aboutHeader">
              <p className="repoWindow__tabTitle -name">
                {capitalize(content.name)}
              </p>
              <p className="repoWindow__description">{content.description}</p>
            </div>
            <div className="flex repoWindow__topics">
              {content.repositoryTopics &&
                content.repositoryTopics.edges.map(({ node }) => (
                  <p className="badge -grey -small" key={node.topic.name}>
                    {node.topic.name}
                  </p>
                ))}
            </div>
            <div className="flex justify-between bevelBorder gradientBorder repoWindow__details">
              <p>
                <img
                  src={`${require("../../assets/commits.png")}`}
                  alt=""
                  width="20"
                  className="pixelated"
                />
                {content.commits && content.commits.history.totalCount} commits
              </p>
              <p>
                <img
                  src={`${require("../../assets/branches.png")}`}
                  alt=""
                  width="20"
                  className="pixelated"
                />
                {content.branches.totalCount} branches
              </p>
              <p>
                <img
                  src={`${require("../../assets/releases.png")}`}
                  alt=""
                  width="20"
                  className="pixelated"
                />
                {content.releases.totalCount} releases
              </p>
              <p>
                <img
                  src={`${require("../../assets/tags.png")}`}
                  alt=""
                  width="20"
                  className="pixelated"
                />
                {content.tags.totalCount} tags
              </p>
            </div>
            <div className="flex justify-between items-center repoWindow__languages">
              {content.languages && (
                <div className="flex items-center">
                  {content.languages.edges.map(({ node }) => (
                    <p
                      className={`languageBadge -textBlack -${node.name}`}
                      key={node.name}
                    >
                      <span
                        className="badge"
                        style={{
                          backgroundColor: node.color,
                        }}
                      ></span>
                      {node.name}
                    </p>
                  ))}
                  {content.languages.totalCount > 5 && (
                    <p className="repoWindow__moreLanguages">
                      + {content.languages.totalCount - 5} more
                    </p>
                  )}
                </div>
              )}
              {content.releases &&
                content.releases.edges &&
                content.releases.edges[0] &&
                content.releases.edges[0].node && (
                  <p className="badge -grey">
                    Latest release: {content.releases.edges[0].node.name}
                  </p>
                )}
            </div>

            {content.apiData && content.apiData.readme ? (
              <Readme>{content.apiData.readme}</Readme>
            ) : (
              <div>
                <p>No Readme file found</p>
              </div>
            )}
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 1 ? "flex" : "none" }}
        >
          <p className="repoWindow__tabTitle">Browse the repo files</p>
          <div className="flex repoWindow__files">
            <div className="repoWindow__filesCol -tree scrollable -xAndY">
              {content.object ? (
                // @ts-ignore
                <FileTree
                  files={content.object.entries}
                  onRowClick={onTreeClick}
                  onFileClick={handleFileClick}
                />
              ) : (
                // ignoring this error bc it isnt erroring in TrendingWindow component & it isnt causing problems here
                <p>No files</p>
              )}
            </div>
            <div className="flex-auto repoWindow__filesCol -preview scrollable -yOnly">
              {Object.keys(fileState).length === 0 && (
                <p className="pt2 center">Select a file</p>
              )}
              <FilePreview file={fileState} />
            </div>
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 2 ? "flex" : "none" }}
        >
          <div className="scrollable -yOnly bevelBorder-small">
            {content.apiData && <Issues data={content.apiData.issues} />}
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 3 ? "flex" : "none" }}
        >
          <div className="scrollable -yOnly bevelBorder-small">
            {content.apiData && (
              <PullRequests data={content.apiData.pullRequests} />
            )}
          </div>
        </section>
      </TabBody>
    </section>
  );
}

FileTree.propTypes = {
  content: PropTypes.object,
  onTreeClick: PropTypes.func,
};

FileTree.defaultTypes = {
  content: undefined,
  onTreeClick: undefined,
};
