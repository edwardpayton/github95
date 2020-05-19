import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar, Toolbar } from "react95";

import Menu from "./Menu";
import MenubarButton from "./MenubarButton";
import MenubarClock from "./MenubarClock";

import { menubarButtons, windowList } from "../store";

export default function Menubar() {
  const [list, setList] = useRecoilState(menubarButtons);
  const openWindows = useRecoilValue(windowList);
  const refWindowList = React.useRef(new Set());

  React.useEffect(() => {
    Object.keys(openWindows).forEach((window) => {
      if (openWindows[window][0]) refWindowList.current.add(window);
      else refWindowList.current.delete(window);
    });
    setList([...refWindowList.current]);
  }, [openWindows]);

  return (
    <AppBar style={{ zIndex: 3, bottom: 0, top: "auto" }}>
      <Toolbar className="justify-between">
        <div>
          <Menu />
          {list.map((windowName) => (
            <MenubarButton name={windowName} key={windowName} />
          ))}
        </div>
        <div style={{ paddingRight: 2 }}>
          <MenubarClock />
        </div>
      </Toolbar>
    </AppBar>
  );
}
