import React from "react";
import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { Button } from "react95";
import { windowObj } from "../../store";
import { DEFAULT_WINDOW } from "../../constants";

import "./styles.scss";

export default function RepoButton({ name, owner }) {
  const [currentWindows, setWindows] = useRecoilState(windowObj);

  const handleClick = () => {
    const windowName = `${owner}${name}`;
    const window = {
      [windowName]: {
        ...DEFAULT_WINDOW,
        label: `Repo: ${owner}/${name}`,
        header: `${owner} ${name}`,
        visibility: [true, true],
        details: {
          owner,
          name,
        },
      },
    };
    setWindows({ ...currentWindows, ...window });
  };

  return (
    <Button onClick={handleClick} className="repoButton">
      Open
    </Button>
  );
}
