import React from "react";

import Icon from "./Icon";

export default function Shortcuts({ shortcuts }) {
  return (
    <>
      {shortcuts &&
        Object.keys(shortcuts).map((repo) => {
          const data = shortcuts[repo];
          return <Icon key={data.name} avatar={data.avatar} name={data.name} />;
        })}
    </>
  );
}
