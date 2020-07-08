import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { searchResultsOfType, reposSearchTopic, repoWindows } from "../store";
import {
  apiGetRepoSearchResults,
  apiGetRepoDetails,
  apiGetFileTree,
} from "./api";
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

  const getRepoFileTree = React.useCallback(
    async (name, owner, file) => {
      const results = await apiGetFileTree(name, owner, file);
      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }

      const details = JSON.parse(
        JSON.stringify(currentDetailWindows[`${owner}${name}`])
      ); // needed because start objects use Object.preventExtensions() so cannot be modified
      const fileNameArr = file.split("/");
      let depth = 0;
      const recursiveUpdate = (row) => {
        row.object.entries.forEach((entry) => {
          if (entry.name !== fileNameArr[depth]) return;
          if (entry.object.entries !== undefined) {
            depth++;
            return recursiveUpdate(entry);
          }
          Object.assign(entry.object, { ...results });
          return entry;
        });
      };

      recursiveUpdate(details);

      setDetails({ ...currentDetailWindows, ...details }); // TODO this doesnt trigger view update

      // console.log(
      //   "~/Sites/github95/src/githubApi/useReposApi >>>",
      //   { ...details },
      //   details
      // );
    },
    [currentDetailWindows]
  );

  return {
    getRepoSearchResults,
    getRepoDetails,
    getRepoFileTree,
  };
}
