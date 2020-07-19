import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import Loading from "../../components/Loading";
import Content from "./Content";

import { windowObj, repoWindows } from "../../store";
import { useReposApi } from "../../githubApi";

import "./styles.scss";

function RepoWindow({ name }) {
  const currentWindows = useRecoilValue(windowObj);
  const currentDetailWindows = useRecoilValue(repoWindows);

  const { getRepoDetails, getRepoFileTree } = useReposApi();

  const handleTreeClick = (filePath) => {
    const details = currentDetailWindows[name];
    const {
      name: repoName,
      owner: { login },
    } = details;

    getRepoFileTree(repoName, login, filePath);
  };

  React.useEffect(() => {
    if (!currentDetailWindows.hasOwnProperty(name)) {
      const { details } = currentWindows[name];
      getRepoDetails(details.name, details.owner);
    }
    console.log(
      "~/Sites/github95/src/views/RepoWindow/index >>>",
      currentDetailWindows
    );
  }, [name, currentWindows, currentDetailWindows]); // eslint-disable-line react-hooks/exhaustive-deps
  // 'getRepoDetails' undeeded

  return (
    <div className="repoWindow">
      {currentDetailWindows.hasOwnProperty(name) ? (
        <Content
          content={currentDetailWindows[name]}
          onTreeClick={handleTreeClick}
        />
      ) : (
        <Loading message="Loading repository" />
      )}
    </div>
  );
}

RepoWindow.propTypes = {
  name: PropTypes.string.isRequired,
};

export default RepoWindow;