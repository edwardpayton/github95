import React from "react";
import { AppBar, Toolbar, Bar } from "react95";

import Menu from "./Menu";
import MenubarButton from "./MenubarButton";
import MenubarClock from "./MenubarClock";

export default function Menubar() {
  return (
    <AppBar style={{ zIndex: 3, bottom: 0, top: "auto" }}>
      <Toolbar className="justify-between">
        <div>
          <Menu />
          <MenubarButton name="about" />
          <MenubarButton name="profile" />
        </div>
        <div style={{ paddingRight: 5 }}>
          <MenubarClock />
        </div>
      </Toolbar>
    </AppBar>
  );
}
