import React from "react";
import PropTypes from "prop-types";
import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";
import { useRecoilValue } from "recoil";

import { focusedElement } from "../../store";
import propTypeChildren from "../../utilities/propTypeChildren";

import "./styles.scss";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function WindowFrame({ name, window, onClose, children }) {
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
        className={`windowFrame -${name}`}
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
                style={{ marginRight: -1 }}
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

const shapeWindow = {
  label: PropTypes.string,
  header: PropTypes.string,
  desktopIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  visibility: PropTypes.arrayOf(PropTypes.bool),
};

WindowFrame.propTypes = {
  name: PropTypes.string.isRequired,
  window: PropTypes.shape(shapeWindow).isRequired,
  onClose: PropTypes.func.isRequired,
  children: propTypeChildren,
};
