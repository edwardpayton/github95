import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "react95";
import PropTypes from "prop-types";

import { windowObj, focusedElement } from "../../store";
import capitalize from "../../utilities/capitalize";

export default function TaskbarButton({ name }) {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const focused = useRecoilValue(focusedElement);

  const handleClick = () => {
    const isFocused = currentWindows[name][1] && focused === name;
    if (isFocused) {
      setWindows({ ...currentWindows, [name]: [true, false] });
    } else {
      setWindows({ ...currentWindows, [name]: [true, true] });
    }
  };

  return (
    <>
      {currentWindows[name][0] && (
        <Button
          data-name={name}
          onClick={handleClick}
          active={focused === name}
          className={`bold taskbarButton${focused === name ? " -focused" : ""}`}
          style={{ marginRight: 3 }}
        >
          {capitalize(name)}
        </Button>
      )}
    </>
  );
}

TaskbarButton.propTypes = {
  name: PropTypes.string.isRequired,
};
