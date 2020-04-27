import React from "react";
import { AppBar, Toolbar } from "react95";

import Menu from "./Menu";
import Search from "./Search";

export default function Menubar() {
  return (
    <AppBar style={{ zIndex: 3 }}>
      <Toolbar className="flex justify-between">
        <Menu />
        <Search onChange={(v) => console.log(v)} />
      </Toolbar>
    </AppBar>
  );
}
