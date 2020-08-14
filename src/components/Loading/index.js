import React from "react";
import PropTypes from "prop-types";
import { Hourglass } from "react95";

import Card from "../Card";

import "./styles.scss";

export default function Loading({ message, size }) {
  return (
    <Card className="loading">
      <Hourglass size={size} />
      <p>{message}</p>
    </Card>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  size: PropTypes.number,
};

Loading.defaultProps = {
  message: "Loading",
  size: 32,
};
