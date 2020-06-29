import React from "react";
import { useRecoilValue } from "recoil";
import { Select } from "react95";

import { searchInputOfType } from "../../store";
import { REPOS } from "../../constants";

const options = [
  { value: 0, label: "Best Match" },
  { value: 1, label: "Stars" },
  { value: 2, label: "Forks" },
  { value: 3, label: "Updated" },
];

const optionsList = ["", "stars", "forks", "updated"];

export default function Filter({ onChange }) {
  const input = useRecoilValue(searchInputOfType(REPOS));
  const [selected, setselected] = React.useState();

  const handleChange = (val, label) => {
    onChange(optionsList[val]);
  };

  return <Select items={options} onChange={handleChange} width={150} />;
}
