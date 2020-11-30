import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame, {
  Welcome,
  About,
  RepoSearch,
  MostFollowed,
  Trending,
  Repo,
  User,
} from "../../windows";

import { windowObj } from "../../store";
import useLocalStorage from "../../hooks/useLocalStorage";

const componentList = {
  welcome: Welcome,
  about: About,
  repos: RepoSearch,
  trending: Trending,
  mostFollowed: MostFollowed,
  user: User,
};

export default function Windows() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  // eslint-disable-next-line no-unused-vars
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
    if (Comp === undefined) return <Repo name={name} />;

    return <Comp />;
  };

  const getCssName = (name) => {
     if(name in componentList) return name;
     return "repositoryDetails";
  }

  return (
    <>
      {Object.keys(currentWindows).map((name) => {
        const content = getContent(name);
        const cssName = getCssName(name);
        if (name === "welcome" && welcomeStorage === false) return null;
        return (
          <WindowFrame
            key={name}
            name={name}
            cssName={cssName}
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
