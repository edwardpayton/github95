import React from "react";
import { useSetRecoilState } from "recoil";
import { Select } from "react95";

import { reposSort } from "../../store";

const options = [
  { value: 0, label: "Best Match" },
  { value: 1, label: "Stars" },
  { value: 2, label: "Forks" },
  { value: 3, label: "Updated" },
];

const optionsList = ["", "stars", "forks", "updated"];

export default function Filter({ onChange }) {
  const setSort = useSetRecoilState(reposSort);

  const handleChange = (val) => {
    onChange(optionsList[val]);
    setSort(optionsList[val]);
  };

  return (
    <Select
      items={options}
      onChange={handleChange}
      width={150}
      className="searchFilter"
    />
  );
}
