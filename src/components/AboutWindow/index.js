import React from "react";
import { Anchor } from "react95";

export default function AboutWindow() {
  return (
    <div className="aboutWindow">
      <h1>About Github 95</h1>
      <p>What might Github have looked like back in the days of Windows 95?</p>
      <p>
        Built using the{" "}
        <Anchor href="https://docs.github.com/en/graphql" target="_blank">
          Github GraphQL api
        </Anchor>
        ,{" "}
        <Anchor href="https://reactjs.org" target="_blank">
          React
        </Anchor>
        , the{" "}
        <Anchor href="https://github.com/arturbien/React95" target="_blank">
          React95
        </Anchor>{" "}
        component library, and icons from{" "}
        <Anchor
          href="https://artage.io/en/icon-packs/original-windows-95-icons"
          target="_blank"
        >
          here
        </Anchor>
        .
      </p>
      <p></p>
    </div>
  );
}
