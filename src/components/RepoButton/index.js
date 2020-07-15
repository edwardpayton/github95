import React from "react";
import PropTypes from "prop-types";

import { Button } from "react95";

import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function RepoButton({ name, owner }) {
  const open = useNewWindow();

  const handleClick = () => {
    open(name, owner);
  };

  return (
    <Button
      onClick={handleClick}
      className="repoButton"
      data-name={`${owner}${name}`}
    >
      Open
    </Button>
  );
}
