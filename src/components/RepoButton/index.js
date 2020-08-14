import React from "react";
import PropTypes from "prop-types";

import { Button } from "react95";

import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function RepoButton({ name, owner, className }) {
  const open = useNewWindow();

  const handleClick = () => {
    open(name, owner);
  };

  return (
    <Button
      onClick={handleClick}
      className={`repoButton${
        className !== undefined && className.length !== 0 && " " + className
      }`}
      data-name={`${owner}${name}`}
    >
      Open
    </Button>
  );
}

RepoButton.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  className: PropTypes.string,
};

RepoButton.defauultProps = {
  className: "",
};
