import React from "react";

import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";

import capitalize from "../utilities/capitalize";

export default function WindowFrame(props) {
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const handleClose = () => {
    // setList({ ...list, about: [false, false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    // setList({ ...list, about: [true, true, true] });
    setFocused(true);
  };

  const handleClickOutside = ({ target }) => {
    const clickedWithin = refWindow.current.contains(target);
    if (!clickedWithin) {
      setFocused(false);
      // setList({ ...list, about: [true, true, false] });
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
      <div
        ref={refWindow}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          maxHeight: "100%",
          display: props.tuple[1] ? "block" : "none",
          zIndex: focused ? 2 : 1,
        }}
        className="fit"
      >
        <Window onClick={handleClick} shadow={focused}>
          <WindowHeader className="flex items-center justify-between handle">
            <span>{capitalize("windowName")}</span>
            <Button
              style={{ marginRight: -6, marginTop: 1 }}
              size={"sm"}
              square
              onClick={handleClose}
            >
              <span
                style={{
                  fontWeight: "bold",
                  transform: "translateY(-2px)",
                  pointerEvents: "none",
                }}
              >
                x
              </span>
            </Button>
          </WindowHeader>
          <WindowContent>{props.children}</WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
