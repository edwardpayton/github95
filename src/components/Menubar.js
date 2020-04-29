import React from "react";
import { AppBar, Toolbar } from "react95";

import Menu from "./Menu";
import MenubarButton from "./MenubarButton";

export default function Menubar() {
  return (
    <AppBar style={{ zIndex: 3 }}>
      <Toolbar>
        <Menu />
        <MenubarButton name="about" />
        <MenubarButton name="profile" />
      </Toolbar>
    </AppBar>
  );
}
