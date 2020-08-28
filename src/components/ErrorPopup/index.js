import React from "react";
import PropTypes from "prop-types";
import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";

import Chord from "./Chord";

import propTypeChildren from "../../utilities/propTypeChildren";

import "./styles.scss";

export default function ErrorPopup({ header, dismissable, children }) {
  const [visible, setVisible] = React.useState(true);

  const handleClose = () => {
    if (dismissable) setVisible(false);
  };

  return (
    <>
      {visible ? (
        <Draggable
          positionOffset={{
            x: "-50%",
            y: "calc(-50% - 25px)",
          }}
          handle=".handle"
        >
          <div className="errorPopup">
            <Window shadow={true} className="flex-column windowFrame__inner">
              <WindowHeader className="flex items-center justify-between handle">
                <span>{header}</span>
                <Button
                  size={"sm"}
                  square
                  disabled={!dismissable}
                  onClick={handleClose}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      transform: "translateY(-1px)",
                    }}
                  >
                    x
                  </span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <div className="flex errorPopup__body">
                  <img
                    src={require(`../../assets/exclamation.png`)}
                    alt=""
                    className="pr2 pixelated"
                  />
                  <div>{children}</div>
                </div>
              </WindowContent>
            </Window>
            <Chord />
          </div>
        </Draggable>
      ) : (
        ""
      )}
    </>
  );
}

ErrorPopup.propTypes = {
  header: PropTypes.string.isRequired,
  dismissable: PropTypes.bool.isRequired,
  children: propTypeChildren,
};
