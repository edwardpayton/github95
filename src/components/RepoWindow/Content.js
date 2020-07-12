import React from "react";
import { Tabs, Tab, TabBody } from "react95";
import { useRecoilValue } from "recoil";

import AnchorButton from "../AnchorButton";
import Readme from "./Readme";
import FileTree from "./FileTree";
import FilePreview from "./FilePreview";
import Issues from "./Issues";
import PullRequests from "./PullRequests";

import { repoFiles } from "../../store";
import { useReposApi } from "../../githubApi";
import capitalize from "../../utilities/capitalize";

export default function Content({ content, onTreeClick }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const files = useRecoilValue(repoFiles);
  const refFile = React.useRef("");
  const [fileState, setFile] = React.useState("");

  const { getRepoFileContents } = useReposApi();

  const handleTabChange = (value) => {
    setActiveTab(value);
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
    <section className="flex flex-column repoWindow">
      <div className="flex justify-between repoWindow__header">
        <h1>
          {content.owner.login}/{content.name}
        </h1>
        <div className="flex">
          <p className="badge -grey">Watchers: {content.watchers.totalCount}</p>
          <p className="badge -grey">Stars: {content.stargazers.totalCount}</p>
          <p className="badge -grey">Forks: {content.forks.totalCount}</p>
          <AnchorButton href={content.url}>Open on github.com</AnchorButton>
        </div>
      </div>
      <div className="repoWindow__tabs">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={0} className="repoWindow__tab">
            <p>About</p>
          </Tab>
          <Tab value={1} className="repoWindow__tab">
            <p>Files</p>
          </Tab>
          <Tab value={2} className="repoWindow__tab">
            <p>Issues</p>
          </Tab>
          <Tab value={3} className="repoWindow__tab">
            <p>Pull Requests</p>
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
                  <p className="badge -grey" key={node.topic.name}>
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
                />
                {content.commits.history.totalCount} commits
              </p>
              <p>
                <img
                  src={`${require("../../assets/branches.png")}`}
                  alt=""
                  width="20"
                />
                {content.branches.totalCount} branches
              </p>
              <p>
                <img
                  src={`${require("../../assets/releases.png")}`}
                  alt=""
                  width="20"
                />
                {content.releases.totalCount} releases
              </p>
              <p>
                <img
                  src={`${require("../../assets/tags.png")}`}
                  alt=""
                  width="20"
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
              {content.licenseInfo && content.licenseInfo.spdxId && (
                <p>{content.licenseInfo.spdxId} license</p>
              )}
            </div>

            {content.apiData && content.apiData.readme ? (
              <Readme>{content.apiData.readme}</Readme>
            ) : (
              <div>
                <p>No readme (todo)</p>
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
              <FileTree
                files={content.object.entries}
                onRowClick={onTreeClick}
                onFileClick={handleFileClick}
              />
            </div>
            <div className="flex-auto repoWindow__filesCol -preview scrollable -yOnly">
              <FilePreview>{fileState}</FilePreview>
            </div>
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 2 ? "flex" : "none" }}
        >
          <div className="scrollable -yOnly">
            <Issues />
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 3 ? "flex" : "none" }}
        >
          <div className="scrollable -yOnly">
            <PullRequests />
          </div>
        </section>
      </TabBody>
    </section>
  );
}
