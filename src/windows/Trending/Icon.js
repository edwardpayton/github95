import React from "react";
import PropTypes from "prop-types";

import Avatar from "./Avatar";

export default function Icon({
  name,
  owner,
  avatar,
  highlighted,
  onSingleClick,
  onDoubleClick,
}) {
  return (
    <button
      data-name={name + owner}
      className={`trendingIcon${highlighted ? " -highlighted" : ""}`}
      onClick={onSingleClick}
      onDoubleClick={onDoubleClick}
    >
      <Avatar src={avatar} />
      <p className="trendingIcon__name">{name}</p>
    </button>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  highlighted: PropTypes.bool.isRequired,
  onSingleClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};
