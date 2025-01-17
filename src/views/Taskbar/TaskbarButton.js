import React from "react";
import PropTypes from "prop-types";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Tooltip } from "react95";

import { windowObj, focusedElement } from "../../store";

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
          <Tooltip text={label ? label : name} className="tooltipOverlay">
            <span className="taskbarButton__label">{label ? label : name}</span>
          </Tooltip>
        </Button>
      )}
    </>
  );
}

TaskbarButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
