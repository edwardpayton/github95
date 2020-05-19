import React from "react";
import { useRecoilValue } from "recoil";

import WindowFrame from "./WindowFrame";
import About from "./About";
import Profile from "./Profile";

import { windowList } from "../store";

const componentList = {
  about: About,
  profile: Profile,
};

export default function Windows() {
  const list = useRecoilValue(windowList);

  return Object.keys(list).map((windowName) => {
    const ContentComp = componentList[windowName];
    return (
      <WindowFrame key={windowName} tuple={list[windowName]}>
        <ContentComp tuple={list[windowName]} />
      </WindowFrame>
    );
  });
}
