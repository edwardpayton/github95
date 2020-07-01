import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  searchInputOfType,
  searchResultsOfType,
  reposSearchTopic,
} from "../store";
import { apiGetRepoSearchResults } from "./api";
import { apiGetTopic } from "./api.v3";
import { REPOS } from "../constants";

export default function useReposApi() {
  const setResults = useSetRecoilState(searchResultsOfType(REPOS));
  const searchInput = useRecoilValue(searchInputOfType(REPOS));
  const [topic, setTopic] = useRecoilState(reposSearchTopic);

  const getRepoSearchResults = React.useCallback(
    async (input, sort = "", cursor) => {
      const repoQuery = sort !== "" ? `${input} sort:${sort}` : input;
      const results = await apiGetRepoSearchResults(repoQuery, cursor);
      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }
      setResults(results);

      if (topic.name !== input) {
        setTopic({});
        const topics = await apiGetTopic(input);

        let i = 0;
        let topicResult = {};
        do {
          if (
            topics.items[i] &&
            topics.items[i].name.toLowerCase() === input.toLowerCase()
          ) {
            topicResult = topics.items[i];
            break;
          }
          i++;
        } while (i < 10);

        setTopic(topicResult);
      }
    },
    [setResults, topic, setTopic]
  );

  return {
    getRepoSearchResults,
  };
}
