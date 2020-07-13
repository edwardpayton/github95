import React from "react";

import Avatar from "./Avatar";

export default function Icon({ name, avatar }) {
  return (
    <button
      className="trendingIcon"
      onClick={() =>
        console.log(
          "~/Sites/github95/src/components/TrendingWindow/Icon >>>",
          name
        )
      }
    >
      <Avatar src={avatar} />
      <p className="trendingIcon__name">{name}</p>
    </button>
  );
}
