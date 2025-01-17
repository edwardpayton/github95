import React from "react";
import { useRecoilState } from "recoil";
import { Button, List, ListItem, Divider } from "react95";

import { windowObj } from "../../store";
import useLocalStorage from "../../hooks/useLocalStorage";

import "./styles.scss";

export default function StartMenu() {
  const [soundStorage, setStorage] = useLocalStorage("github95_noSound", "On");
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
    const updated = {
      [name]: {
        ...currentWindows[name],
        visibility: [true, true],
      },
    };
    window.setTimeout(() => {
      setWindows({ ...currentWindows, ...updated });
    }, 300);
    toggleMenu(false);
  };

  const handleClickOutside = ({ target }) => {
    if (refMenu.current.contains(target)) return;
    toggleMenu(false);
  };

  const handleSoundToggle = () => {
    const storageValue = {
      Off: "On",
      On: "Off",
    };
    setStorage(storageValue[soundStorage]);
  };

  return (
    <div className="startMenu" ref={refMenu}>
      <div className={`startMenu__slide${isOpen ? " -isOpen" : ""}`}>
        <List
          horizontalAlign="left"
          verticalAlign="top"
          className="startMenu__menu"
        >
          <ListItem onClick={handleListClick("repos")} data-name="repos">
            <p className="startMenu__menuItem">
              <img
                src={`${require("../../assets/search-computer.png")}`}
                alt=""
                width="20"
                className="pixelated"
              />
              Repositories
            </p>
          </ListItem>
          <ListItem onClick={handleListClick("user")} data-name="user">
            <p className="startMenu__menuItem">
              <img
                src={`${require("../../assets/user.png")}`}
                alt=""
                width="20"
                className="pixelated"
              />
              Find Users
            </p>
          </ListItem>
          <ListItem onClick={handleListClick("about")} data-name="about">
            <p className="startMenu__menuItem">
              <img
                src={`${require("../../assets/wordpad.png")}`}
                alt=""
                width="20"
                className="pixelated"
              />
              About
            </p>
          </ListItem>
          <Divider />
          <ListItem onClick={handleSoundToggle}>
            <p className="startMenu__menuItem -soundItem">
              Startup sound: <span className="badge -grey">{soundStorage}</span>
            </p>
          </ListItem>
        </List>
      </div>
      <Button
        data-name="start-menu"
        onClick={handleButtonClick}
        active={isOpen}
        className="mr1 startMenu__triggerButton"
      >
        <img
          src={require("../../assets/octocat-icon.png").default}
          alt=""
          className="pixelated startMenu__logo"
        />
        Github95
      </Button>
    </div>
  );
}
