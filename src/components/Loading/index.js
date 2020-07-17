import React from "react";
import { Hourglass } from "react95";

import "./styles.scss";

export default function Loading({ message = "Loading", size = 32 }) {
  return (
    <div className="card loading">
      <Hourglass size={size} />
      <p>{message}</p>
    </div>
  );
}
