import React from "react";

import About from "./About";
import Profile from "./Profile";

import { windowList } from "../hooks/sharedStates";

export default function Windows() {
  const [{ profile, about }, _] = windowList();
  const refWindows = React.useRef(undefined);

  return (
    <div ref={refWindows}>
      {about[0] && about[1] && <About />}
      {profile[0] && profile[1] && <Profile />}
    </div>
  );
}
