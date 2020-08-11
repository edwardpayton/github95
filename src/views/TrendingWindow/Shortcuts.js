import React from "react";

import Icon from "./Icon";

import useNewWindow from "../../hooks/useNewWindow";

export default function Shortcuts({ shortcuts, type }) {
  const [highlighted, setHighlight] = React.useState("");

  const open = useNewWindow();

  const handleSnglClick = (name) => () => {
    setHighlight(name);
  };

  const handleDblClick = (name, owner) => () => {
    if (type === "developers") return;

    open(name, owner);
  };

  return (
    <>
      {shortcuts &&
        Object.keys(shortcuts).map((repo) => {
          const data = shortcuts[repo];
          return (
            <Icon
              key={data.name}
              avatar={data.avatar}
              name={data.name}
              highlighted={highlighted === data.name}
              onSingleClick={handleSnglClick(data.name)}
              onDoubleClick={handleDblClick(data.name, data.author)}
            />
          );
        })}
    </>
  );
}
