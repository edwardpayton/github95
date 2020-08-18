import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame from "../../components/WindowFrame";
import WelcomeWindow from "../WelcomeWindow";
import AboutWindow from "../AboutWindow";
import UserWindow from "../UserWindow";
import RepoSearchWindow from "../RepoSearchWindow";
import TrendingWindow from "../TrendingWindow";
import MostFollowedWindow from "../MostFollowedWindow";
import RepoWindow from "../RepoWindow";

import { windowObj } from "../../store";
import useLocalStorage from "../../hooks/useLocalStorage";

const componentList = {
  welcome: WelcomeWindow,
  about: AboutWindow,
  user: UserWindow,
  repos: RepoSearchWindow,
  trending: TrendingWindow,
  mostFollowed: MostFollowedWindow,
};

export default function Windows() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const [welcomeStorage, _] = useLocalStorage("github95_welcome");

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

  const getContent = (name) => {
    const Comp = componentList[name];
    if (Comp === undefined) return <RepoWindow name={name} />;

    return <Comp />;
  };

  return (
    <>
      {Object.keys(currentWindows).map((name) => {
        const content = getContent(name);
        if (name === "welcome" && welcomeStorage === false) return null;
        return (
          <WindowFrame
            key={name}
            name={name}
            window={currentWindows[name]}
            onClose={handleCloseWindow}
          >
            {content}
          </WindowFrame>
        );
      })}
    </>
  );
}
