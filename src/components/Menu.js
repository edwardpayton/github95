import React from "react";
import { Button, List, ListItem, Divider } from "react95";

import { openWindows } from "../hooks/sharedStates";

export default function Menu() {
  const [, setWindow] = openWindows();

  const [isOpen, setOpen] = React.useState(false);
  const refMenu = React.useRef(undefined);

  const toggleMenu = (toggle) => {
    setOpen(toggle);
    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const handleButtonClick = () => {
    toggleMenu(!isOpen);
  };

  const handleListClick = (name) => {
    setWindow({ [name]: [true, true] });
    toggleMenu(false);
  };

  const handleClickOutside = ({ target }) => {
    if (refMenu.current.contains(target)) return;
    toggleMenu(false);
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={refMenu}
    >
      {isOpen && (
        <List horizontalAlign="left" verticalAlign="bottom" open={isOpen}>
          <ListItem onClick={() => handleListClick("about")}>👨‍💻 About</ListItem>
          <ListItem onClick={() => handleListClick("profile")}>
            👨‍💻 Profile
          </ListItem>
          <ListItem onClick={() => handleListClick("code")}>
            📁 View Code
          </ListItem>
          <Divider />
          <ListItem>Sounds: ON</ListItem>
        </List>
      )}
      <Button
        onClick={handleButtonClick}
        active={isOpen}
        style={{ fontWeight: "bold" }}
      >
        <img
          src={require("../images/win-logo.png")}
          style={{ width: "22px", paddingRight: "5px" }}
        />
        Github 95
      </Button>
    </div>
  );
}
