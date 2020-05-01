import React from "react";
import { Button, List, ListItem, Divider } from "react95";

import { windowList } from "../hooks/sharedStates";

export default function Menu() {
  const [, setWindow] = windowList();

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
    <div style={{ position: "relative", float: "left" }} ref={refMenu}>
      {isOpen && (
        <List
          horizontalAlign="left"
          verticalAlign="top"
          open={isOpen}
          className="startMenu"
        >
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
        style={{ textShadow: "-1px 0 hsla(0, 0%, 0%, 0.7)" }}
        className="mr1"
      >
        <img
          src={require("../assets/win-logo.png")}
          style={{ width: 22, paddingRight: 5 }}
        />
        Github 95
      </Button>
    </div>
  );
}
