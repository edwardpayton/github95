import React from "react";

export default function DesktopButton({
  name,
  label,
  icon,
  active,
  onDoubleClick,
}) {
  return (
    <div key={name} className="desktopButton">
      <button
        data-name={name}
        className={`desktopButton__button${name === active ? " -focused" : ""}`}
        onDoubleClick={onDoubleClick}
      >
        <img
          src={icon}
          className="desktopButton__image"
          alt="icon"
          width="50"
        />
        <p className="desktopButton__name">{label}</p>
      </button>
    </div>
  );
}
