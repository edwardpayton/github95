import React from "react";

import Icon from "./Icon";

import useNewWindow from "../../hooks/useNewWindow";

export default function Shortcuts({ shortcuts, type }) {
  const open = useNewWindow();

  const handleClick = (name, owner) => () => {
    if (type === "developers") return;

    console.log(
      "~/Sites/github95/src/components/TrendingWindow/Shortcuts >>>",
      name,
      owner
    );

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
              onClick={handleClick(data.name, data.author)}
            />
          );
        })}
    </>
  );
}
