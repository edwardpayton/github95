import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import Readme from "./Readme";

import { windowObj, repoWindows } from "../../store";
import { useReposApi } from "../../githubApi";

export default function RepoWindow({ name }) {
  const currentWindows = useRecoilValue(windowObj);
  const currentDetailWindows = useRecoilValue(repoWindows);
  const [contents, setContents] = React.useState({});

  const { getRepoDetails } = useReposApi();

  React.useEffect(() => {
    if (contents.hasOwnProperty("name")) return;
    if (currentDetailWindows[name] && !contents.hasOwnProperty("name")) {
      setContents(currentDetailWindows[name]);
    } else {
      const { details } = currentWindows[name];
      getRepoDetails(details.name, details.owner);
    }
  }, [name, currentWindows, currentDetailWindows]); // eslint-disable-line react-hooks/exhaustive-deps
  // 'currentDetailWindows' causes crash
  // 'getRepoDetails' undeeded

  return (
    <div className="repoWindow">
      {contents["name"] ? (
        <>
          <p>{contents["name"]}</p>
          <p>{contents["description"]}</p>
          {contents["apiData"] && contents["apiData"]["readme"] && (
            <Readme>{contents["apiData"]["readme"]}</Readme>
          )}
        </>
      ) : (
        <p>TODO - loading</p>
      )}
    </div>
  );
}

RepoWindow.propTypes = {
  name: PropTypes.string.isRequired,
};
