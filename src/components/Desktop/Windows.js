import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame from "./WindowFrame";
import AboutWindow from "../AboutWindow";
import UserWindow from "../UserWindow";
import RepoSearchWindow from "../RepoSearchWindow";
import RepoWindow from "../RepoWindow";

import { windowObj } from "../../store";

const componentList = {
  about: AboutWindow,
  user: UserWindow,
  repos: RepoSearchWindow,
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

  const getContent = (name) => {
    const Comp = componentList[name];
    if (Comp === undefined) return <RepoWindow id={name} />;

    return <Comp />;
  };

  return (
    <>
      {Object.keys(currentWindows).map((name) => {
        const content = getContent(name);
        const small = ["repos", "user"].indexOf(name) < 0;
        return (
          <WindowFrame
            key={name}
            name={name}
            window={currentWindows[name]}
            onClose={handleCloseWindow}
            small={small}
          >
            {content}
          </WindowFrame>
        );
      })}
    </>
  );
}
