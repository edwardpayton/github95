import React from "react";
import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";
import { useRecoilValue } from "recoil";

import { focusedElement } from "../../store";

import capitalize from "../../utilities/capitalize";

export default function WindowFrame({
  name,
  window,
  onClose,
  onClickWindow,
  small,
  children,
}) {
  const focused = useRecoilValue(focusedElement);
  const refCloseBtn = React.useRef(undefined);

  const handleClose = () => onClose(name);

  const handleClickWindow = ({ target }) => {
    if (target.parentNode === refCloseBtn.current) return;
    onClickWindow(name);
  };

  return (
    <Draggable
      positionOffset={{ x: "-50%", y: "calc(-50% - 25px)" }}
      handle=".handle"
    >
      <div
        data-name={name}
        style={{
          display: window.visibility[1] ? "block" : "none",
          zIndex: focused === name ? 2 : 1,
        }}
        className={`windowFrame${small ? " -small" : ""}`}
      >
        <Window
          onClick={handleClickWindow}
          shadow={focused === name}
          className="flex-column windowFrame__inner"
        >
          <WindowHeader
            className={`flex items-center justify-between handle windowHeader${
              focused === name ? "" : " -inactive"
            }`}
          >
            <span>{window.header}</span>
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
