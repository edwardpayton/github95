import React from "react";

import Avatar from "./Avatar";

export default function Icon({ name, avatar, onClick }) {
  return (
    <button className="trendingIcon" onClick={onClick}>
      <Avatar src={avatar} />
      <p className="trendingIcon__name">{name}</p>
    </button>
  );
}
