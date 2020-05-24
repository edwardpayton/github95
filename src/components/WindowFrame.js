import React from "react";

import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";

import capitalize from "../utilities/capitalize";

export default function WindowFrame({
  name,
  tuple,
  onClose,
  onClickWindow,
  small,
  children,
}) {
  const refWindow = React.useRef(undefined);
  const refCloseBtn = React.useRef(undefined);

  const handleClose = () => onClose(name);

  const handleClickWindow = ({ target }) => {
    if (target.parentNode === refCloseBtn.current) return;
    onClickWindow(name);
  };

  // const handleClickOutside = ({ target }) => {
  //   const clickedWithin = refWindow.current.contains(target);
  //   if (!clickedWithin) {
  //     // setList({ ...list, about: [true, true, false] });
  //   }
  // };

  // React.useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Draggable
      positionOffset={{ x: "-50%", y: "calc(-50% - 25px)" }}
      handle=".handle"
    >
      <div
        ref={refWindow}
        style={{
          display: tuple[1] ? "block" : "none",
          zIndex: tuple[2] ? 2 : 1,
        }}
        className={`fit windowFrame${small ? " __small" : ""}`}
      >
        <Window
          onClick={handleClickWindow}
          shadow={tuple[2]}
          className="flex-column windowFrame__inner"
        >
          <WindowHeader
            className={`flex items-center justify-between handle windowHeader${
              tuple[2] ? "" : " -inactive"
            }`}
          >
            <span>{capitalize(name)}</span>
            <span ref={refCloseBtn}>
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
            </span>
          </WindowHeader>
          <WindowContent className="windowFrame__content">
            <div className="flex flex-column windowFrame__contentInner">
              {children}
            </div>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
