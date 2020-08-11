import React from "react";

import Avatar from "./Avatar";

export default function Icon({
  name,
  avatar,
  highlighted,
  onSingleClick,
  onDoubleClick,
}) {
  return (
    <button
      className={`trendingIcon${highlighted ? " -highlighted" : ""}`}
      onClick={onSingleClick}
      onDoubleClick={onDoubleClick}
    >
      <Avatar src={avatar} />
      <p className="trendingIcon__name">{name}</p>
    </button>
  );
}
