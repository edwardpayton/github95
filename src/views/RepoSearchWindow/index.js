import React from "react";
import { Tabs, Tab, TabBody, Hourglass } from "react95";

import TabAll from "./TabAll";

import "./styles.scss";

export default function RepoSearchWindow() {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (_, value) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className="flex flex-column repoSearch__content">
        <div className="repoTabs">
          <Tabs value={activeTab} onChange={handleTabChange} className="tabs">
            <Tab value={0} className="tabs__tab repoTabs__tab">
              <p>All</p>
            </Tab>
            <Tab value={1} className="tabs__tab repoTabs__tab">
              <p>Hottest</p>
            </Tab>
            <Tab value={2} className="tabs__tab repoTabs__tab">
              <p>Trending</p>
            </Tab>
          </Tabs>
        </div>

        <TabBody className="repoTabs__tabBody tab">
          <section
            className="flex flex-column"
            style={{ display: activeTab === 0 ? "flex" : "none" }}
          >
            <TabAll />
          </section>
        </TabBody>
      </div>
    </>
  );
}
