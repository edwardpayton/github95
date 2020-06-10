import React from "react";
import { useRecoilValue } from "recoil";

import { focusedElement } from "../../store";

import capitalize from "../../utilities/capitalize";

export default function DesktopButton({ name, active, onDoubleClick }) {
  return (
    <div key={name} className="desktopButton">
      <button
        data-name={name}
        className={`desktopButton__button${name === active ? " -focused" : ""}`}
        onDoubleClick={onDoubleClick}
      >
        <img
          src={require(`../../assets/${name}.png`)}
          className="desktopButton__image"
          alt="icon"
          width="50"
        />
        <p className="desktopButton__name">{capitalize(name)}</p>
      </button>
    </div>
  );
}
