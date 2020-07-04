import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { searchResultsOfType, reposSearchTopic, repoWindows } from "../store";
import { apiGetRepoSearchResults, apiGetRepoDetails } from "./api";
import { apiGetTopic } from "./api.v3";
import { REPOS } from "../constants";

export default function useReposApi() {
  const setResults = useSetRecoilState(searchResultsOfType(REPOS));
  const [topic, setTopic] = useRecoilState(reposSearchTopic);
  const [currentDetailWindows, setDetails] = useRecoilState(repoWindows);

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

  const getRepoDetails = React.useCallback(async (name, owner) => {
    const results = await apiGetRepoDetails(name, owner);
    if (!results || results instanceof Error) {
      console.error("ERROR", results); // TODO
    }

    setDetails({ ...currentDetailWindows, [`${owner}${name}`]: results });
  }, []);

  return {
    getRepoSearchResults,
    getRepoDetails,
  };
}
