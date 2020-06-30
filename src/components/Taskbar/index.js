import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar, Toolbar } from "react95";

import StartMenu from "./StartMenu";
import TaskbarButton from "./TaskbarButton";
import TaskbarClock from "./TaskbarClock";

import { menubarButtons, windowObj } from "../../store";

import "./styles.scss";

export default function Taskbar() {
  const [currentButtons, setButtons] = useRecoilState(menubarButtons);
  const openWindows = useRecoilValue(windowObj);
  const refWindowMap = React.useRef(new Map());

  React.useEffect(() => {
    Object.keys(openWindows).forEach((window) => {
      if (openWindows[window].visibility[0])
        refWindowMap.current.set(window, openWindows[window]);
      else refWindowMap.current.delete(window);
    });
    setButtons([...refWindowMap.current]);
  }, [openWindows]);

  return (
    <AppBar style={{ zIndex: 3, bottom: 0, top: "auto" }}>
      <Toolbar className="justify-between">
        <div>
          <StartMenu />
          {[...currentButtons].map((name) => (
            <TaskbarButton name={name[0]} label={name[1].label} key={name[0]} />
          ))}
        </div>
        <div style={{ paddingRight: 2 }}>
          <TaskbarClock />
        </div>
      </Toolbar>
    </AppBar>
  );
}
