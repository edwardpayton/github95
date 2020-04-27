import React from "react";
import { Button, List, ListItem, Divider } from "react95";

export default function Menu() {
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

  const handleListClick = () => {
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
        <List
          horizontalAlign="left"
          verticalAlign="bottom"
          open={isOpen}
          onClick={handleListClick}
        >
          <ListItem>👨‍💻 About</ListItem>
          <ListItem>📁 View Code</ListItem>
          <Divider />
          <ListItem>Sounds: ON</ListItem>
        </List>
      )}
      <Button
        onClick={handleButtonClick}
        active={isOpen}
        style={{ fontWeight: "bold" }}
      >
        {/* <LogoIcon style={{ marginLeft: -2, marginRight: 4 }} /> */}
        Github 95
      </Button>
    </div>
  );
}
