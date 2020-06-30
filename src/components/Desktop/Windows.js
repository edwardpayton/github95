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

  const handleCloseWindow = (name) => {
    const updated = {
      [name]: {
        ...currentWindows[name],
        visibility: [false, false],
      },
    };
    setWindows({
      ...currentWindows,
      ...updated,
    });
  };

  const handleClickWindow = () => {
    const newList = {};
    Object.keys(currentWindows).forEach((windowName) => {
      newList[windowName] = { ...currentWindows[windowName] };
    });
    setWindows(newList);
  };

  return (
    <>
      {Object.keys(currentWindows).map((name) => {
        const ContentComp = componentList[name];
        const small = name === "about";
        return (
          <WindowFrame
            key={name}
            name={name}
            window={currentWindows[name]}
            onClose={handleCloseWindow}
            onClickWindow={handleClickWindow}
            small={small}
          >
            <ContentComp />
          </WindowFrame>
        );
      })}
    </>
  );
}
