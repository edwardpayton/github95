import React from "react";
import { useRecoilState } from "recoil";
import { Button } from "react95";
import PropTypes from "prop-types";

import { windowList } from "../store";
import capitalize from "../utilities/capitalize";

export default function MenubarButton({ name }) {
  const [list, setList] = useRecoilState(windowList);

  const handleClick = () => {
    const isFocused = list[name][1] && list[name][2];
    if (isFocused) {
      setList({ ...list, [name]: [true, false, false] });
    } else {
      setList({ ...list, [name]: [true, true, true] });
    }
  };

  return (
    <>
      {list[name][0] && (
        <Button
          onClick={handleClick}
          active={list[name][2]}
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
