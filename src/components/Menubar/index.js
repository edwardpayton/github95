import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar, Toolbar } from "react95";

import Menu from "./Menu";
import MenubarButton from "./MenubarButton";
import MenubarClock from "./MenubarClock";

import { menubarButtons, windowObj } from "../../store";

export default function Menubar() {
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
          <Menu />
          {currentButtons.map((buttonName) => (
            <MenubarButton name={buttonName} key={buttonName} />
          ))}
        </div>
        <div style={{ paddingRight: 2 }}>
          <MenubarClock />
        </div>
      </Toolbar>
    </AppBar>
  );
}
