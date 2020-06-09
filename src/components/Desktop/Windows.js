import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame from "./WindowFrame";
import AboutWindow from "../AboutWindow/";
import UserWindow from "../UserWindow/";
import ReposWindow from "../ReposWindow/";

import { windowObj } from "../../store";

const componentList = {
  about: AboutWindow,
  user: UserWindow,
  repos: ReposWindow,
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
    const small = windowName === "about";
    return (
      <WindowFrame
        key={windowName}
        name={windowName}
        window={currentWindows[windowName]}
        onClose={handleCloseWindow}
        onClickWindow={handleClickWindow}
        small={small}
      >
        <ContentComp />
      </WindowFrame>
    );
  });
}
