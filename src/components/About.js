import React from "react";
import { Anchor } from "react95";

export default function About() {
  return (
    <>
      <p className="h1">Github 95</p>
      <p className="mt2">
        {"Icons "}{" "}
        <Anchor
          href="https://artage.io/en/icon-packs/original-windows-95-icons"
          target="_blank"
        >
          downloaded here.
        </Anchor>
      </p>
      <p className="mt2">
        {"Startup sound "}{" "}
        <Anchor
          href="http://soundbible.com/1654-Windows-95-Startup.html"
          target="_blank"
        >
          downloaded here.
        </Anchor>
      </p>
    </>
  );
}
