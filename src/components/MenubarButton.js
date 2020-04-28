import React from "react";
import { Button } from "react95";
import PropTypes from "prop-types";

import { openWindows } from "../hooks/sharedStates";
import capitalize from "../utilities/capitalize";

export default function MenubarButton({ name }) {
  const [state, set] = openWindows();

  const _handleClick = () => {
    set({ [name]: [true, !state[name][1]] });
  };

  return (
    <>
      {state[name][0] && (
        <Button
          onClick={_handleClick}
          active={state[name][1]}
          className="bold"
          style={{ marginRight: 3 }}
        >
          {capitalize(name)}
        </Button>
      )}
    </>
  );
}

MenubarButton.propTypes = {
  name: PropTypes.string.isRequired,
};
