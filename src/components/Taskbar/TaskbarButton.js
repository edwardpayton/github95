import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "react95";
import PropTypes from "prop-types";

import { windowObj, userCurrentNum, usersListObj } from "../../store";
import capitalize from "../../utilities/capitalize";

export default function TaskbarButton({ name }) {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const userList = useRecoilValue(usersListObj);
  const currentUser = useRecoilValue(userCurrentNum);
  const [buttonText, setText] = React.useState(capitalize(name));

  React.useEffect(() => {
    if (currentUser && name === "user" && userList[currentUser].name)
      setText(userList[currentUser].name);
  }, [name, userList, currentUser]);

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

TaskbarButton.propTypes = {
  name: PropTypes.string.isRequired,
};
