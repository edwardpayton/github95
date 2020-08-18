import React from "react";
import { useRecoilState } from "recoil";
import { Anchor, Button, Divider } from "react95";

import { windowObj } from "../../store";
import useLocalStorage from "../../hooks/useLocalStorage";

import "./styles.scss";

export default function WelcomeWindow() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const [_, setStorage] = useLocalStorage("github95_welcome", true);

  const handleMoreClick = () => {
    const updated = {
      about: {
        ...currentWindows.about,
        visibility: [true, true],
      },
    };

    window.setTimeout(() => {
      setWindows({ ...currentWindows, ...updated });
    }, 300);
  };

  const handleCloseClick = () => {
    const updated = {
      welcome: {
        ...currentWindows.welcome,
        visibility: [false, false],
      },
    };

    setWindows({ ...currentWindows, ...updated });

    setStorage(false);
  };

  return (
    <div className="p2 flex flex-column welcome">
      <h1 className="mb2 welcome__title">
        Welcome to <span className="welcome__ghText">Github</span>
        <span className="welcome__95Text">95</span>
      </h1>
      <div className="flex flex-auto">
        <div className="p2 bevelBorder welcome__body">
          <div className="mb3 flex flex-auto">
            <div>
              <img
                src={require("../../assets/lightbulb-exclamation.png")}
                alt=""
              />
            </div>
            <div className="pl2">
              <p className="mb2 welcome__dykText">Did you know...</p>
              <p>
                To browse Github repositories and users, you just click
                <br />
                the Github95 button, and then the programs icon.
              </p>
            </div>
          </div>
          <div className="mb2 center">
            <img src={require("../../assets/welcome-computer.png")} alt="" />
          </div>
        </div>
        <div className="pl2 flex flex-column justify-between welcome__buttons">
          <div className="flex flex-column">
            <Button onClick={handleMoreClick} data-name="about">
              Find out more
            </Button>
            <Divider className="welcome__hr" />
            <Button onClick={handleCloseClick}>Don't show again</Button>
          </div>

          <Anchor
            href="https://github.com/edwardpayton/github95"
            target="_blank"
          >
            Open code on Github
          </Anchor>
        </div>
      </div>
    </div>
  );
}
