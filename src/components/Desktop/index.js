import React from "react";
import { useRecoilState } from "recoil";

import { WINDOW_OBJ } from "../../constants";
import { windowObj } from "../../store";

import Taskbar from "../Taskbar";
import Windows from "./Windows";
import DesktopButton from "./DesktopButton";

import "./styles.scss";

const desktopIcons = (() => {
  let aa = Object.keys(WINDOW_OBJ)
    .filter((name) => (WINDOW_OBJ[name].desktopIcon ? name : null))
    .sort(
      (a, b) => WINDOW_OBJ[a].desktopPosition - WINDOW_OBJ[b].desktopPosition
    );
  return aa;
})();

export default function Desktop() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const [active, setActive] = React.useState("");

  const handleDesktopClick = ({ target }) => {
    const { name } = target.dataset;
    setActive(name || "");
  };

  const handleButtonDblClick = (name) => (e) => {
    e.stopPropagation();
    const updated = {
      [name]: {
        ...currentWindows[name],
        visibility: [true, true],
      },
    };

    window.setTimeout(() => {
      setWindows({ ...currentWindows, ...updated });
    }, 300);
  };

  return (
    <>
      <Taskbar />
      <main>
        <section style={{ height: "100%" }}>
          <section
            className="flex flex-column desktop"
            onClick={handleDesktopClick}
          >
            {desktopIcons.map((name) => {
              const { label, desktopIcon } = WINDOW_OBJ[name];
              return (
                <React.Fragment key={name}>
                  {desktopIcon && (
                    <DesktopButton
                      name={name}
                      label={label}
                      active={active}
                      onDoubleClick={handleButtonDblClick(name)}
                    />
                  )}
                </React.Fragment>
              );
            })}
            {/* <DesktopButton
              name={"repos"}
              label={"Find Repos"}
              active={active}
              onDoubleClick={handleButtonDblClick("repos")}
            />
            <DesktopButton
              name={"user"}
              label={""}
              active={active}
              onDoubleClick={handleButtonDblClick("repos")}
            />
            <DesktopButton
              name={"repos"}
              label={"Find Repos"}
              active={active}
              onDoubleClick={handleButtonDblClick("repos")}
            /> */}
          </section>
          <Windows />
        </section>
      </main>
    </>
  );
}
