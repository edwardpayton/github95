import React from "react";
import { Button } from "react95";
import PropTypes from "prop-types";

import { windowList } from "../hooks/sharedStates";
import capitalize from "../utilities/capitalize";

export default function MenubarButton({ name }) {
  const [state, set] = windowList();

  const handleClick = () => {
    console.log(
      "~/Sites/github95/src/components/MenubarButton >>>",
      state.profile
    );
    if (state[name][1] && state[name][2]) {
      set({ [name]: [true, false, false] });
    } else if (state[name][1] && !state[name][2]) {
      set({ [name]: [true, true, true] });
    }
  };

  return (
    <>
      {state[name][0] && (
        <Button
          onClick={handleClick}
          active={state[name][2]}
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
