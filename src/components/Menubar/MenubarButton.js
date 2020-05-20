import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "react95";
import PropTypes from "prop-types";

import { userData, windowObj } from "../../store";
import capitalize from "../../utilities/capitalize";

export default function MenubarButton({ name }) {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const user = useRecoilValue(userData);
  const [buttonText, setText] = React.useState(capitalize(name));

  React.useEffect(() => {
    if (name === "user" && user.profile.name) setText(user.profile.name);
  }, [name, user.profile]);

  // React.useEffect(() => {
  //   // TODO if repos...setText()
  // }, []);

  const handleClick = () => {
    const isFocused = currentWindows[name][1] && currentWindows[name][2];
    if (isFocused) {
      setWindows({ ...currentWindows, [name]: [true, false, false] });
    } else {
      setWindows({ ...currentWindows, [name]: [true, true, true] });
    }
  };

  return (
    <>
      {currentWindows[name][0] && (
        <Button
          onClick={handleClick}
          active={currentWindows[name][2]}
          className="bold"
          style={{ marginRight: 3 }}
        >
          {buttonText}
        </Button>
      )}
    </>
  );
}

MenubarButton.propTypes = {
  name: PropTypes.string.isRequired,
};
