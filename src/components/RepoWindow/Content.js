import React from "react";
import { Tabs, Tab, TabBody } from "react95";

import AnchorButton from "../AnchorButton";
import Readme from "./Readme";
import FileTree from "./FileTree";
import Issues from "./Issues";

export default function WindowContent({ content }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  React.useEffect(() => {
    console.log(
      "~/Sites/github95/src/components/RepoWindow/Content >>>",
      content
    );
  }, []);

  return (
    <section className="flex flex-column repoWindow">
      <div className="flex justify-between repoWindow__header">
        <h1>
          {content.owner.login} / {content.name}
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
          <Tab value={4} className="repoWindow__tab">
            <p>Insights</p>
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
              <p>{content.name}</p>
              <p>{content.description}</p>
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
              <p>commits</p>
              <p>branches</p>
              <p>releases</p>
              <p>contributors</p>
            </div>
            <p>releases, used by, contributor, languages</p>
            <div className="flex repoWindow__topics">
              {content.languages &&
                content.languages.edges.map(({ node }) => (
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
              {content.languages && content.languages.totalCount > 5 && (
                <p>+ {content.languages.totalCount - 5} more</p>
              )}
            </div>

            {content.apiData && content.apiData.readme ? (
              <Readme>{content.apiData.readme}</Readme>
            ) : (
              <div>
                <p>No readme (todo)</p>
              </div>
            )}
            <p>Add link on desktop</p>
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 1 ? "flex" : "none" }}
        >
          <div className="repoWindow__bodyInner scrollable -yOnly">
            <p>Files</p>
            <FileTree files={content.object.entries} />
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 2 ? "flex" : "none" }}
        >
          <div className="repoWindow__bodyInner scrollable -yOnly">
            <Issues />
          </div>
        </section>
      </TabBody>
    </section>
  );
}
