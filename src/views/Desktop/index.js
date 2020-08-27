import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import StartupSound from "../../components/StartupSound";
import Taskbar from "../Taskbar";
import ErrorPopup from "../ErrorPopup";
import Windows from "./Windows";
import DesktopButton from "./DesktopButton";

import useLocalStorage from "../../hooks/useLocalStorage";
import { WINDOW_OBJ } from "../../constants";
import { apiLimit, windowObj } from "../../store";
import reducer, {
  SET_LOADING,
  SET_TASKBAR,
  SET_ICONS,
  SET_WINDOWS,
} from "./reducer";

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
  // const limit = useRecoilValue(apiLimit);
  const [active, setActive] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [soundStorage, _] = useLocalStorage("github95_noSound");

  const [
    { showLoader, showTaskbar, showIcons, showWindows },
    dispatch,
  ] = reducer();

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

  React.useEffect(() => {
    // @ts-ignore
    dispatch({ type: SET_LOADING });
    window.setTimeout(() => {
      // @ts-ignore
      dispatch({ type: SET_TASKBAR });
    }, 500);
    window.setTimeout(() => {
      // @ts-ignore
      dispatch({ type: SET_ICONS });
    }, 1000);
    window.setTimeout(() => {
      // @ts-ignore
      dispatch({ type: SET_WINDOWS });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showLoader && <p>Loading</p>}
      {showTaskbar && (
        <>
          <Taskbar />
          {soundStorage !== "Off" && <StartupSound />}
        </>
      )}
      <main>
        <section style={{ height: "100%" }}>
          {showIcons && (
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
          )}

          {showWindows && <Windows />}

          {/* {limit.exceeded ? (
            <ErrorPopup
              header="Github 95 has encountered an error"
              dismissable={false}
            >
              <p>The Github Api limit has been exceeded.</p>
              <p>Please try again after {limit.resetAt}.</p>
            </ErrorPopup>
          ) : (
            <Windows />
          )} */}
        </section>
      </main>
    </>
  );
}
