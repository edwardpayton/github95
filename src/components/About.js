import React from "react";
import { Window, WindowContent, WindowHeader, Button, Anchor } from "react95";
import Draggable from "react-draggable";

export default function About() {
  const handleClose = () => {};
  const handleClick = () => {};

  return (
    <Draggable>
      <Window
        onClick={handleClick}
        style={{
          width: 300,
          maxWidth: "94%",
          maxHeight: "100%",
          zIndex: 2,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "block",
        }}
      >
        <WindowHeader className="flex items-center justify-between">
          <span>About</span>
          <Button
            style={{ marginRight: "-6px", marginTop: "1px" }}
            size={"sm"}
            square
            onClick={handleClose}
          >
            <span style={{ fontWeight: "bold", transform: "translateY(-1px)" }}>
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
  );
}
