import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  TextField,
  Checkbox,
  Select,
  Button,
  Tabs,
  Tab,
  TabBody,
} from "react95";

import { searchInputOfType, currentRecordOfType, reposSort } from "../../store";
import { REPOS } from "../../constants";
import { useReposApi } from "../../githubApi";

const inititalCheckboxes = {
  name: false,
  description: false,
  readme: false,
};

const options = [
  { value: 0, label: "Best Match" },
  { value: 1, label: "Stars" },
  { value: 2, label: "Forks" },
  { value: 3, label: "Updated" },
];

const optionsList = ["", "stars", "forks", "updated"];

export default function Searchbar() {
  const [input, setInput] = useRecoilState(searchInputOfType(REPOS));
  const setCurrentRepo = useSetRecoilState(currentRecordOfType(REPOS));
  const [sort, setSort] = useRecoilState(reposSort);

  const [activeTab, setActiveTab] = React.useState(0);
  const [checkboxes, setCheckboxes] = React.useState(inititalCheckboxes);

  const { getRepoSearchResults } = useReposApi();

  const handleTabChange = (_, tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = ({ target }) => {
    const { value } = target;
    setCheckboxes({
      ...checkboxes,
      [value]: !checkboxes[value],
    });
  };

  const handleSortChange = (_, { value }) => {
    setSort(optionsList[value]);
  };

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length) {
      const searchQualifier = Object.keys(checkboxes)
        .map((key) => {
          if (checkboxes[key] === true) return key;
        })
        .filter(Boolean)
        .reduce((str, current, i) => {
          if (i === 0) return ` in:${current}`;
          return `${str},${current}`;
        }, "");
      setCurrentRepo(input);
      getRepoSearchResults(input + searchQualifier, sort);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInput("");
    setActiveTab(0);
    setCheckboxes(inititalCheckboxes);
  };

  return (
    <div className="flex flex-column items-stretch searchBar">
      <Tabs value={activeTab} onChange={handleTabChange} className="tabs">
        <Tab value={0} className="tabs__tab searchBar__tab">
          <p>Default</p>
        </Tab>
        <Tab value={1} className="tabs__tab rsearchBar__tab">
          <p>Advanced</p>
        </Tab>
      </Tabs>

      <div className="flex flex-auto">
        <TabBody className="flex-auto searchBar__tabBody tab">
          <form
            id="repoSearchForm"
            onSubmit={handleSubmit}
            className="searchBar__form"
          >
            <div
              className="items-baseline"
              style={{
                display: activeTab === 0 || activeTab === 1 ? "flex" : "none",
              }}
            >
              <p className="searchBar__label">Name:</p>
              <TextField
                value={input}
                placeholder="Search repositories"
                onChange={handleChange}
                className="flex-auto searchBar__input"
              />
            </div>
            <div
              className="mt1 items-baseline"
              style={{ display: activeTab === 1 ? "flex" : "none" }}
            >
              <p className="searchBar__label">Sort:</p>
              <Select
                options={options}
                onChange={handleSortChange}
                width={150}
                className="searchBar__input -select"
              />
              <p className="searchBar__label -checkbox">Search in:</p>
              <div className="flex searchBar__checkboxes">
                <Checkbox
                  checked={checkboxes.name}
                  onChange={handleCheckboxChange}
                  value="name"
                  label="Name"
                  name="advanced"
                  className="checkbox searchBar__input -checkbox"
                />
                <Checkbox
                  checked={checkboxes.description}
                  onChange={handleCheckboxChange}
                  value="description"
                  label="Description"
                  name="advanced"
                  className="checkbox searchBar__input -checkbox"
                />
                <Checkbox
                  checked={checkboxes.readme}
                  onChange={handleCheckboxChange}
                  value="readme"
                  label="Readme"
                  name="advanced"
                  className="checkbox searchBar__input -checkbox"
                />
              </div>
            </div>
          </form>
        </TabBody>

        <div className="ml2 flex flex-column">
          <Button
            onClick={handleSubmit}
            disabled={input.length === 0}
            className="searchBar__button"
            form="repoSearchForm"
          >
            Find Now
          </Button>
          <Button
            onClick={handleReset}
            disabled={input.length === 0}
            className="mt1 searchBar__button"
            form="repoSearchForm"
          >
            New Search
          </Button>
        </div>
      </div>
    </div>
  );
}
