import React from "react";

import { WINDOW_OBJ } from "../data/constants";
import { windowList } from "../hooks/sharedStates";

export default function Desktop() {
  const [, set] = windowList();
  const [focused, setFocus] = React.useState("");

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const name = e.currentTarget.id.replace("desktopButton", "");

    setFocus(name);
  };

  const handleDblClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const name = e.currentTarget.id.replace("desktopButton", "");
    set({ [name]: [true, true] });
  };

  return (
    <section
      className="flex flex-column max-width-5 ml1"
      style={{ height: "calc(100% - 2rem)", paddingTop: "2rem" }}
    >
      {Object.keys(WINDOW_OBJ).map((name) => (
        <div
          key={name}
          style={{
            width: "140px",
            height: "140px",
            textAlign: "center",
            border: "1px dotted",
            borderColor: focused === name ? "#000" : "transparent",
          }}
        >
          <button
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              outline: "none",
              border: "none",
              color: "#fff",
            }}
            id={"desktopButton" + name}
            onClick={handleClick}
            onDoubleClick={handleDblClick}
          >
            <img src="" alt="icon" />
            <p>{name}</p>
          </button>
        </div>
      ))}
    </section>
  );
}
