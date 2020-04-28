import React from "react";
import { Window, WindowContent, WindowHeader, Button, Anchor } from "react95";
import Draggable from "react-draggable";

import { openWindows } from "../hooks/sharedStates";

export default function About() {
  const [{ about }, set] = openWindows();
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const handleClose = () => {
    set({ about: [false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ about: [true, true] });
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

  return (
    <div ref={refWindow}>
      <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
        <Window
          onClick={handleClick}
          style={{
            width: 300,
            maxWidth: "94%",
            maxHeight: "100%",
            zIndex: focused ? 2 : 1,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: about[1] ? "block" : "none",
          }}
          shadow={focused}
        >
          <WindowHeader className="flex items-center justify-between handle">
            <span>About</span>
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
      </Draggable>
    </div>
  );
}
