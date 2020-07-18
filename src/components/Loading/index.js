import React from "react";
import { Hourglass } from "react95";

import Card from "../Card";

import "./styles.scss";

export default function Loading({ message = "Loading", size = 32 }) {
  return (
    <Card className="loading">
      <Hourglass size={size} />
      <p>{message}</p>
    </Card>
  );
}
