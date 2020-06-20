import React from "react";
import { useRecoilState } from "recoil";
import { Button, List, ListItem, Divider } from "react95";

import { windowObj } from "../../store";
import useCookie from "../../hooks/useCookie";

export default function StartMenu() {
  const [soundCookie, setCookie] = useCookie("github95_noSound", "Off");
  const [currentWindows, setWindows] = useRecoilState(windowObj);
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

  const handleListClick = (name) => () => {
    setWindows({ ...currentWindows, [name]: [true, true] });
    toggleMenu(false);
  };

  const handleClickOutside = ({ target }) => {
    if (refMenu.current.contains(target)) return;
    toggleMenu(false);
  };

  const handleSoundToggle = () => {
    const cookieValue = {
      Off: "On",
      On: "Off",
    };
    setCookie(cookieValue[soundCookie]);
  };

  return (
    <div className="startMenu" ref={refMenu}>
      {isOpen && (
        <List
          horizontalAlign="left"
          verticalAlign="top"
          open={isOpen}
          className="startMenu__menu"
        >
          <ListItem onClick={handleListClick("repos")} data-name="repos">
            <p className="startMenu__menuItem">
              <span role="img" aria-label="repos">
                👨‍💻
              </span>{" "}
              Repositories
            </p>
          </ListItem>
          <ListItem onClick={handleListClick("user")} data-name="user">
            <p className="startMenu__menuItem">
              <span role="img" aria-label="profile">
                👨‍💻
              </span>{" "}
              Profile
            </p>
          </ListItem>
          <ListItem onClick={handleListClick("about")} data-name="about">
            <p className="startMenu__menuItem">
              <span role="img" aria-label="about">
                👨‍💻
              </span>{" "}
              About
            </p>
          </ListItem>
          <Divider />
          <ListItem onClick={handleSoundToggle}>
            <p className="startMenu__menuItem -soundItem">
              Startup sound: <span className="badge -grey">{soundCookie}</span>
            </p>
          </ListItem>
        </List>
      )}
      <Button
        data-name="start-menu"
        onClick={handleButtonClick}
        active={isOpen}
        className="mr1 startMenu__triggerButton"
      >
        <img
          src={require("../../assets/win-logo.png")}
          alt=""
          className="startMenu__logo"
        />
        Github 95
      </Button>
    </div>
  );
}
