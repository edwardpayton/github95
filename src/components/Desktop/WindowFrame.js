import React from "react";
import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";
import { useRecoilValue } from "recoil";

import { focusedElement } from "../../store";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function WindowFrame({
  name,
  window,
  onClose,
  small,
  children,
}) {
  const focused = useRecoilValue(focusedElement);
  const refCloseBtn = React.useRef(undefined);
  const [pos, setPos] = React.useState([]);

  const handleClose = () => onClose(name);

  React.useEffect(() => {
    setPos([randomInt(-40, 40), randomInt(10, 30)]);
  }, [name]);

  return (
    <Draggable
      positionOffset={{
        x: `calc(-50% + ${pos[0]}px)`,
        y: `calc(-50% - ${pos[1]}px)`,
      }}
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
          shadow={focused === name}
          className="flex-column windowFrame__inner"
        >
          <WindowHeader
            className={`flex items-center justify-between handle windowHeader${
              focused === name ? "" : " -inactive"
            }`}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: window.header,
              }}
              className="flex items-center windowHeader__title"
            ></span>
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
