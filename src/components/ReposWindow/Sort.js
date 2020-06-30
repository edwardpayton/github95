import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Select } from "react95";

import { searchResultsOfType, reposSort } from "../../store";
import { REPOS } from "../../constants";

const options = [
  { value: 0, label: "Best Match" },
  { value: 1, label: "Stars" },
  { value: 2, label: "Forks" },
  { value: 3, label: "Updated" },
];

const optionsList = ["", "stars", "forks", "updated"];

export default function Sort({ onChange }) {
  const results = useRecoilValue(searchResultsOfType(REPOS));
  const setSort = useSetRecoilState(reposSort);

  const handleChange = (val) => {
    onChange(optionsList[val]);
    setSort(optionsList[val]);
  };

  return (
    <div className={`sort${!results.repositoryCount ? " -disabled" : ""}`}>
      <Select
        items={options}
        onChange={handleChange}
        width={150}
        className="searchFilter"
      />
    </div>
  );
}
