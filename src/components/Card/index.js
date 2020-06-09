import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

export default function Card({ className, children }) {
  return (
    <div className={`card${className ? " " + className : ""}`}>{children}</div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  // children: PropTypes. // TODO
};
