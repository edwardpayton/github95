import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Taskbar from "../../components/Taskbar";
import ErrorPopup from "../ErrorPopup";
import Windows from "./Windows";
import DesktopButton from "./DesktopButton";

import { WINDOW_OBJ } from "../../constants";
import { apiLimit, windowObj } from "../../store";

import "./styles.scss";

const desktopIcons = (() => {
  const icons = Object.keys(WINDOW_OBJ)
    .filter((name) => (WINDOW_OBJ[name].desktopIcon ? name : null))
    .sort(
      (a, b) => WINDOW_OBJ[a].desktopPosition - WINDOW_OBJ[b].desktopPosition
    );
  return icons;
})();

export default function Desktop() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);
  const limit = useRecoilValue(apiLimit);
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
                  {desktopIcon.length && (
                    <DesktopButton
                      name={name}
                      label={label}
                      icon={desktopIcon}
                      active={active}
                      onDoubleClick={handleButtonDblClick(name)}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </section>

          {limit.exceeded ? (
            <ErrorPopup
              header="Github 95 has encountered an error"
              dismissable={false}
            >
              <p>The Github Api limit has been exceeded.</p>
              <p>Please try again after {limit.resetAt}.</p>
            </ErrorPopup>
          ) : (
            <Windows />
          )}
        </section>
      </main>
    </>
  );
}
