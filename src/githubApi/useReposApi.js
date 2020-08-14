import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  repoSearchStatus,
  searchResultsOfType,
  reposSearchTopic,
  repoWindows,
  repoFiles,
  mostFollowed,
} from "../store";
import {
  apiGetRepoSearchResults,
  apiGetRepoDetails,
  apiGetFileTree,
  apiGetFileContents,
  apiGetRepoIssues,
  apiGetRepoPullRequests,
  apiGetRepoMostFollowed,
} from "./api";
import { apiGetTopic } from "./api.v3";
import { REPOS } from "../constants";

export default function useReposApi() {
  const setSearchState = useSetRecoilState(repoSearchStatus);
  const setResults = useSetRecoilState(searchResultsOfType(REPOS));
  const [topic, setTopic] = useRecoilState(reposSearchTopic);
  const [currentDetailWindows, setDetails] = useRecoilState(repoWindows);
  const [files, setFiles] = useRecoilState(repoFiles);
  const setMostFollowed = useSetRecoilState(mostFollowed);

  const getRepoSearchResults = React.useCallback(
    async (input, sort = "", cursor) => {
      const repoQuery = sort !== "" ? `${input} sort:${sort}` : input;
      const statusKey = cursor ? "gettingPage" : "gettingSearch";
      setSearchState({ [statusKey]: true });
      const results = await apiGetRepoSearchResults(repoQuery, cursor);
      if (!results || results instanceof Error) {
        setSearchState({ [statusKey]: false, error: results }); // TODO what to do with this
      }
      setSearchState({ [statusKey]: false });
      setResults(results);

      if (topic["name"] !== input) {
        setTopic({});
        setSearchState({ gettingTopic: true });
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

        setSearchState({ gettingTopic: false });
        setTopic(topicResult);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setResults, topic, setTopic]
    // 'setSearchState' - not needed
  );

  const getRepoDetails = React.useCallback(
    async (name, owner) => {
      const results = await apiGetRepoDetails(name, owner);
      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }

      setDetails({ ...currentDetailWindows, [`${owner}${name}`]: results });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDetailWindows]
    // 'setDetails' - not needed
  );

  const getRepoFileTree = React.useCallback(
    async (name, owner, file) => {
      const results = await apiGetFileTree(name, owner, file);
      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }

      const details = JSON.parse(JSON.stringify(currentDetailWindows)); // needed because state objects use Object.preventExtensions() so cannot be modified
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

      recursiveUpdate(details[`${owner}${name}`]);

      setDetails({ ...details });
    },
    [currentDetailWindows, setDetails]
  );

  const getRepoFileContents = React.useCallback(
    async (name, owner, file) => {
      const results = await apiGetFileContents(name, owner, file);
      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }

      const newFile = `${name}${file}`.replace(/[^A-Za-z0-9]/g, "");

      setFiles({
        ...files,
        [newFile]: {
          name: file,
          ...results,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
    // 'setFiles' - not needed
  );

  const getMostFollowed = React.useCallback(async () => {
    const results = await apiGetRepoMostFollowed();
    if (!results || results instanceof Error) {
      console.error("ERROR", results); // TODO
    }

    setMostFollowed(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRepoIssues = React.useCallback(
    async (name, owner) => {
      const date = new Date();
      const minus1Wk = date.setDate(date.getDate() - 7);
      const since = new Date(minus1Wk).toISOString();

      const results = await apiGetRepoIssues(name, owner, since);

      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }

      const details = JSON.parse(JSON.stringify(currentDetailWindows));

      details[`${owner}${name}`].apiData = {
        ...details[`${owner}${name}`].apiData,
        issues: results,
      };

      setDetails({ ...details });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDetailWindows]
    // 'setDetails' - not needed
  );

  const getRepoPullRequests = React.useCallback(
    async (name, owner) => {
      const results = await apiGetRepoPullRequests(name, owner);

      if (!results || results instanceof Error) {
        console.error("ERROR", results); // TODO
      }

      const details = JSON.parse(JSON.stringify(currentDetailWindows));

      details[`${owner}${name}`].apiData = {
        ...details[`${owner}${name}`].apiData,
        pullRequests: results,
      };

      setDetails({ ...details });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDetailWindows]
    // 'setDetails' - not needed
  );

  return {
    getRepoSearchResults,
    getRepoDetails,
    getRepoFileTree,
    getRepoFileContents,
    getRepoIssues,
    getRepoPullRequests,
    getMostFollowed,
  };
}
