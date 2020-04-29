import React from "react";
import { AppBar, Toolbar, Bar } from "react95";

import Menu from "./Menu";
import MenubarButton from "./MenubarButton";

export default function Menubar() {
  return (
    <AppBar style={{ zIndex: 3, bottom: 0, top: "auto" }}>
      <Toolbar>
        <Menu />
        <Bar className="mx1" />

        <MenubarButton name="about" />
        <MenubarButton name="profile" />
      </Toolbar>
    </AppBar>
  );
}
