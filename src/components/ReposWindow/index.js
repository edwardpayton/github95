import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { repos, userSearchInput } from "../../store";

import SearchInput from "../SearchInput";

import useGithubApi from "../../githubApi";

export default function AboutWindow() {
  const [repoList, setList] = useRecoilState(repos);
  const searchInputValue = useRecoilValue(userSearchInput);

  return (
    <>
      <SearchInput
        labelText="Repos"
        placeholder=""
        defaultValue={""}
        onSearch={() => ""}
      />
      {repoList ? <p>repos</p> : <p>Not found</p>}
    </>
  );
}
