import React from "react";
import { useRecoilState } from "recoil";

import { WINDOW_OBJ } from "../../constants";
import { windowObj } from "../../store";

import DesktopButton from "./DesktopButton";

export default function Desktop() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const [active, setActive] = React.useState("");

  const handleDesktopClick = ({ target }) => {
    const { name } = target.dataset;
    setActive(name || "");
  };

  const handleButtonDblClick = (name) => (e) => {
    e.stopPropagation();
    window.setTimeout(() => {
      setWindows({ ...currentWindows, [name]: [true, true] });
    }, 300);
  };

  return (
    <section className="flex flex-column desktop" onClick={handleDesktopClick}>
      {Object.keys(WINDOW_OBJ).map((name) => (
        <DesktopButton
          name={name}
          active={active}
          onDoubleClick={handleButtonDblClick(name)}
          key={name}
        />
      ))}
    </section>
  );
}
