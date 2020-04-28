import React from "react";
import { Window, WindowContent, WindowHeader, Button, Fieldset } from "react95";
import Draggable from "react-draggable";

import Search from "./Search";

import { openWindows, userData } from "../hooks/sharedStates";

export default function Profile() {
  const [{ profile }, set] = openWindows();
  const [{ user }] = userData();
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const handleClose = () => {
    set({ profile: [false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ profile: [true, true] });
  };

  const handleClickFocus = ({ target }) => {
    const clickedWithin = refWindow.current.contains(target);
    setFocused(clickedWithin);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickFocus);
    return () => document.removeEventListener("mousedown", handleClickFocus);
  }, []);

  return (
    <div ref={refWindow}>
      <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
        <Window
          onClick={handleClick}
          style={{
            width: 800,
            height: 600,
            maxWidth: "100%",
            maxHeight: "100%",
            zIndex: focused ? 2 : 1,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: profile[1] ? "block" : "none",
          }}
          shadow={focused}
        >
          <WindowHeader className="flex items-center justify-between handle">
            <span>Profile</span>
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
          <WindowContent>
            <Search onChange={(v) => console.log(v)} />
            <br />
            <Fieldset>
              <div className="clearfix mxn1">Profile:{user["name"]}</div>
            </Fieldset>
          </WindowContent>
        </Window>
      </Draggable>
    </div>
  );
}
