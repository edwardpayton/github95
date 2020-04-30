import React from "react";

import About from "./About";
import Profile from "./Profile";

export default function Windows() {
  const refWindows = React.useRef(undefined);
  const [xy, setXy] = React.useState([0, 0]);

  React.useEffect(() => {
    // TODO for maximising
    if (refWindows.current) {
      const {
        top,
        left,
        bottom,
        right,
      } = refWindows.current.getBoundingClientRect();
      setXy([right - left, bottom - top]);
    }
  }, [refWindows]);

  return (
    <div ref={refWindows}>
      <About />
      <Profile />
    </div>
  );
}
