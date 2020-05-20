import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame from "./WindowFrame";
import About from "./About";
import Profile from "./Profile";

import { windowObj } from "../store";

const componentList = {
  about: About,
  profile: Profile,
};

export default function Windows() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);

  const handleCloseWindow = (currentWindow) => {
    setWindows({ ...currentWindows, [currentWindow]: [false, false, false] });
  };

  const handleClickWindow = (currentWindow) => {
    const newList = {};
    Object.keys(currentWindows).forEach((windowName) => {
      newList[windowName] = [...currentWindows[windowName]];
      newList[windowName][2] = currentWindow === windowName;
    });
    setWindows(newList);
  };

  return Object.keys(currentWindows).map((windowName) => {
    const ContentComp = componentList[windowName];
    return (
      <WindowFrame
        key={windowName}
        name={windowName}
        tuple={currentWindows[windowName]}
        onClose={handleCloseWindow}
        onClickWindow={handleClickWindow}
      >
        <ContentComp tuple={currentWindows[windowName]} />
      </WindowFrame>
    );
  });
}
