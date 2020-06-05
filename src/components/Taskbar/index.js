import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar, Toolbar } from "react95";

import StartMenu from "./StartMenu";
import TaskbarButton from "./TaskbarButton";
import TaskbarClock from "./TaskbarClock";

import { menubarButtons, windowObj } from "../../store";

export default function Taskbar() {
  const [currentButtons, setButtons] = useRecoilState(menubarButtons);
  const openWindows = useRecoilValue(windowObj);
  const refWindowSet = React.useRef(new Set());

  React.useEffect(() => {
    Object.keys(openWindows).forEach((window) => {
      if (openWindows[window][0]) refWindowSet.current.add(window);
      else refWindowSet.current.delete(window);
    });
    setButtons([...refWindowSet.current]);
  }, [openWindows]);

  return (
    <AppBar style={{ zIndex: 3, bottom: 0, top: "auto" }}>
      <Toolbar className="justify-between">
        <div>
          <StartMenu />
          {currentButtons.map((buttonName) => (
            <TaskbarButton name={buttonName} key={buttonName} />
          ))}
        </div>
        <div style={{ paddingRight: 2 }}>
          <TaskbarClock />
        </div>
      </Toolbar>
    </AppBar>
  );
}
