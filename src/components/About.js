import React from "react";
import { Window, WindowContent, WindowHeader, Button, Anchor } from "react95";
import Draggable from "react-draggable";

import { windowList } from "../hooks/sharedStates";

export default function About() {
  const [{ about }, set] = windowList();
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const handleClose = () => {
    set({ about: [false, false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ about: [true, true, true] });
    setFocused(true);
  };

  const handleClickOutside = ({ target }) => {
    const clickedWithin = refWindow.current.contains(target);
    if (!clickedWithin) {
      setFocused(false);
      set({ about: [true, true, false] });
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
          display: about[1] ? "block" : "none",
          zIndex: focused ? 2 : 1,
        }}
        className="fit"
      >
        <Window onClick={handleClick} shadow={focused}>
          <WindowHeader className="flex items-center justify-between handle">
            <span>About</span>
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
          <WindowContent>
            <p className="h1">Github 95</p>
            <p className="mt2">
              {"Icons "}{" "}
              <Anchor
                href="https://artage.io/en/icon-packs/original-windows-95-icons"
                target="_blank"
              >
                downloaded here.
              </Anchor>
            </p>
            <p className="mt2">
              {"Startup sound "}{" "}
              <Anchor
                href="http://soundbible.com/1654-Windows-95-Startup.html"
                target="_blank"
              >
                downloaded here.
              </Anchor>
            </p>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
