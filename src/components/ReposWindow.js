import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { repos, searchInput } from "../store";

import SearchInput from "./SearchInput";

export default function AboutWindow() {
  const [repoList, setList] = useRecoilState(repos);
  const searchInputValue = useRecoilValue(searchInput);

  return (
    <>
      <SearchInput />
      {repoList ? <p>repos</p> : <p>Not found</p>}
    </>
  );
}
