import React from "react";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";

import { openWindows } from "../hooks/sharedStates";

export default function WindowFrame({ name, headerText, children }) {
  const refWindow = React.useRef(undefined);
  const [windowList, set] = openWindows();
  const [active, setActive] = React.useState(false);
  const [focused, setFocused] = React.useState(true);

  const handleClose = () => {
    set({ [name]: [false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ [name]: [true, true] });
  };

  const handleClickFocus = ({ target }) => {
    const clickedWithin = refWindow.current.contains(target);
    setFocused(clickedWithin);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickFocus);
    return () => {
      document.removeEventListener("mousedown", handleClickFocus);
    };
  }, []);

  React.useEffect(() => {
    if (windowList && windowList[name]) {
      const [open, actv, focsd] = windowList[name];
      setActive(actv);
      setFocused(actv);
    }
  }, [windowList[name]]);

  return (
    <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
      <div
        ref={refWindow}
        style={{
          width: 300,
          maxWidth: "calc(100% - 47px)",
          maxHeight: "100%",
          zIndex: focused ? 2 : 1,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: active ? "block" : "none",
        }}
      >
        <Window onClick={handleClick} shadow={focused}>
          <WindowHeader className="flex items-center justify-between handle">
            <span>{headerText}</span>
            <Button
              style={{ marginRight: "-6px", marginTop: "1px" }}
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
          <WindowContent>{children}</WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
