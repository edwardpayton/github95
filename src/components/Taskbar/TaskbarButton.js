import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "react95";
import PropTypes from "prop-types";

import { windowObj, focusedElement } from "../../store";
import capitalize from "../../utilities/capitalize";

export default function TaskbarButton({ name, label }) {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const focused = useRecoilValue(focusedElement);

  const handleClick = () => {
    const isFocused = currentWindows[name].visibility[1] && focused === name;
    if (isFocused) {
      const updated = {
        [name]: {
          ...currentWindows[name],
          visibility: [true, false],
        },
      };
      setWindows({ ...currentWindows, ...updated });
    } else {
      const updated = {
        [name]: {
          ...currentWindows[name],
          visibility: [true, true],
        },
      };
      setWindows({ ...currentWindows, ...updated });
    }
  };

  return (
    <>
      {currentWindows[name].visibility[0] && (
        <Button
          data-name={name}
          onClick={handleClick}
          active={focused === name}
          className={`bold taskbarButton${focused === name ? " -focused" : ""}`}
          style={{ marginRight: 3 }}
        >
          {label ? label : name}
        </Button>
      )}
    </>
  );
}

TaskbarButton.propTypes = {
  name: PropTypes.string.isRequired,
};
