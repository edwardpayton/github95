import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

export default function AnchorButton({
  href,
  className,
  children,
  target = "_blank",
}) {
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
  children: PropTypes.string.isRequired,
  target: PropTypes.string,
};
