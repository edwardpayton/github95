import React from "react";
import { Button, Anchor } from "react95";

import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function AboutWindow() {
  const open = useNewWindow();

  const handleClick = () => {
    open("github95", "edwardpayton");
  };

  return (
    <section className="aboutWindow">
      <div className="flex justify-between aboutWindow__header">
        <div className="flex flex-auto items-center">
          <Button variant="menu" size="sm">
            File
          </Button>
          <Button variant="menu" size="sm">
            Edit
          </Button>
          <Button variant="menu" size="sm">
            View
          </Button>
        </div>
      </div>
      <div className="scrollable -yOnly aboutWindow__body">
        <div className="aboutWindow__bodyInner">
          <h1>About Github 95</h1>
          <p>
            What might Github have looked like back in the days of Windows 95?
          </p>
          <p>Built using:</p>
          <p>
            -{" "}
            <Anchor href="https://reactjs.org" target="_blank">
              React
            </Anchor>
          </p>
          <p>
            -{" "}
            <Anchor href="https://recoiljs.org" target="_blank">
              Recoil
            </Anchor>
          </p>
          <p>
            -{" "}
            <Anchor href="https://github.com/arturbien/React95" target="_blank">
              React95 Component Library
            </Anchor>
          </p>
          <p>
            -{" "}
            <Anchor href="https://docs.github.com/en/graphql" target="_blank">
              Github GraphQL Api
            </Anchor>
          </p>
          <p>
            -{" "}
            <Anchor href="https://docs.github.com/en/rest" target="_blank">
              Github Rest Api
            </Anchor>
          </p>
          <p>
            -{" "}
            <Anchor
              href="https://github.com/huchenme/github-trending-api"
              target="_blank"
            >
              (Unofficial) Github Trending Api
            </Anchor>
          </p>
          <p>
            -{" "}
            <Anchor
              href="https://artage.io/en/icon-packs/original-windows-95-icons"
              target="_blank"
            >
              Windows 95 style icons
            </Anchor>
          </p>
          <p>
            Find out more in the
            <button onClick={handleClick} className="aboutWindow__button">
              projects repository
            </button>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
