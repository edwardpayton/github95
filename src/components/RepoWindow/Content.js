import React from "react";
import { Tabs, Tab, TabBody } from "react95";

import AnchorButton from "../AnchorButton";
import Readme from "./Readme";

export default function WindowContent({ content }) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

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
            <p>Code</p>
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
            </div>
            {content.apiData && content.apiData.readme && (
              <Readme>{content.apiData.readme}</Readme>
            )}
          </div>
        </section>

        <section
          className="flex flex-column absolute repoWindow__body"
          style={{ display: activeTab === 1 ? "flex" : "none" }}
        >
          <div className="repoWindow__bodyInner scrollable -yOnly">code</div>
        </section>
      </TabBody>
    </section>
  );
}
