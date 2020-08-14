import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

export default function AnchorButton({ href, className, children, target }) {
  return (
    <a
      href={href}
      target={target}
      className={`anchorButton${className ? " " + className : ""}`}
    >
      {children}
    </a>
  );
}

AnchorButton.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
};

AnchorButton.defaultProps = {
  target: "_blank",
};
