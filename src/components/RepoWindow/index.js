import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import Content from "./Content";

import { windowObj, repoWindows } from "../../store";
import { useReposApi } from "../../githubApi";

import "./styles.scss";

function RepoWindow({ name }) {
  const currentWindows = useRecoilValue(windowObj);
  const currentDetailWindows = useRecoilValue(repoWindows);

  const { getRepoDetails } = useReposApi();

  React.useEffect(() => {
    if (!currentDetailWindows.hasOwnProperty(name)) {
      const { details } = currentWindows[name];
      getRepoDetails(details.name, details.owner);
    }
  }, [name, currentWindows, currentDetailWindows]); // eslint-disable-line react-hooks/exhaustive-deps
  // 'getRepoDetails' undeeded

  return (
    <>
      {currentDetailWindows.hasOwnProperty(name) ? (
        <Content content={currentDetailWindows[name]} />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

RepoWindow.propTypes = {
  name: PropTypes.string.isRequired,
};

export default React.memo(RepoWindow);
