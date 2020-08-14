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
  const currentWindows = useRecoilValue(windowObj);
  const refWindowMap = React.useRef(new Map());

  React.useEffect(() => {
    Object.keys(currentWindows).forEach((window) => {
      if (currentWindows[window].visibility[0])
        refWindowMap.current.set(window, currentWindows[window]);
      else refWindowMap.current.delete(window);
    });
    setButtons([...refWindowMap.current]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWindows]);
  // 'setButtons' - not needed

  return (
    <AppBar className="taskbar">
      <Toolbar className="justify-between relative taskbar__toolbar">
        <div className="flex taskbar__buttonWrapper">
          <StartMenu />
          <div className="relative taskbar__applications">
            <div className="flex taskbar__applicationsButtons">
              {[...currentButtons].map((name) => (
                <TaskbarButton
                  name={name[0]}
                  label={name[1].label}
                  key={name[0]}
                />
              ))}
            </div>
          </div>
        </div>
        <TaskbarClock />
      </Toolbar>
    </AppBar>
  );
}
