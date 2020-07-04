import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import { windowObj, repoWindows } from "../../store";
import { useReposApi } from "../../githubApi";

export default function RepoWindow({ name }) {
  const currentWindows = useRecoilValue(windowObj);
  const currentDetailWindows = useRecoilValue(repoWindows);
  const [contents, setContents] = React.useState({});

  const { getRepoDetails } = useReposApi();

  React.useEffect(() => {
    if (currentDetailWindows[name]) {
      setContents(currentDetailWindows[name]);
      console.log(
        "~/Sites/github95/src/components/RepoWindow/index >>>",
        currentDetailWindows[name]
      );
    } else {
      const { details } = currentWindows[name];
      getRepoDetails(details.name, details.owner);
    }
  }, [name, currentWindows]); // eslint-disable-line react-hooks/exhaustive-deps
  // 'currentDetailWindows' causes crash
  // 'getRepoDetails' undeeded

  return (
    <div>
      {contents["name"] ? (
        <>
          <p>{contents["name"]}</p>
          <p>{contents["description"]}</p>
        </>
      ) : (
        <p>TODO</p>
      )}
    </div>
  );
}

RepoWindow.propTypes = {
  name: PropTypes.string.isRequired,
};
