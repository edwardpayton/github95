import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame from "./WindowFrame";
import About from "./About";
import Profile from "./Profile";

import { windowList } from "../store";

const componentList = {
  about: About,
  profile: Profile,
};

export default function Windows() {
  const [list, setList] = useRecoilState(windowList);

  const handleCloseWindow = (currentWindow) => {
    setList({ ...list, [currentWindow]: [false, false, false] });
  };

  const handleClickWindow = (currentWindow) => {
    let newList = { ...list };

    // TODO erorring when both windows open
    Object.keys(list).forEach((windowName) => {
      if (currentWindow === windowName) {
        newList[windowName][2] = true;
      } else {
        newList[windowName][2] = false;
      }
    });
    setList(newList);
  };

  return Object.keys(list).map((windowName) => {
    const ContentComp = componentList[windowName];
    return (
      <WindowFrame
        key={windowName}
        name={windowName}
        tuple={list[windowName]}
        onClose={handleCloseWindow}
        onClickWindow={handleClickWindow}
      >
        <ContentComp tuple={list[windowName]} />
      </WindowFrame>
    );
  });
}
