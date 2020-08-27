import React from "react";
import { Button, Anchor } from "react95";

import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function About() {
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
          <h1 className="mb2">About Github95</h1>
          <p>
            Happy Quarter-Century Birthday to Windows 95! Launched Aug. 24, 1995
          </p>
          <p>https://www.youtube.com/watch?v=MhZVyQtFx_U</p>
          <p>
            No responsive layouts here, it will work fine on an iPad, but
            phones... you're mileage may vary
          </p>
          <p>The tools used to build this:</p>
          <ul className="aboutWindow__list">
            <li>
              <Anchor href="https://reactjs.org" target="_blank">
                React
              </Anchor>
            </li>
            <li>
              <Anchor href="https://recoiljs.org" target="_blank">
                Recoil
              </Anchor>
            </li>
            <li>
              <Anchor
                href="https://github.com/arturbien/React95"
                target="_blank"
              >
                React95 Component Library
              </Anchor>
            </li>
            <li>
              <Anchor href="https://docs.github.com/en/graphql" target="_blank">
                Github GraphQL Api
              </Anchor>
            </li>
            <li>
              <Anchor href="https://docs.github.com/en/rest" target="_blank">
                Github Rest Api
              </Anchor>
            </li>
            <li>
              <Anchor
                href="https://github.com/huchenme/github-trending-api"
                target="_blank"
              >
                (Unofficial) Github Trending Api
              </Anchor>
            </li>
            <li>
              <Anchor
                href="https://artage.io/en/icon-packs/original-windows-95-icons"
                target="_blank"
              >
                Windows 95 style icons
              </Anchor>
            </li>
          </ul>
          <p>
            Find out more in the
            <button onClick={handleClick} className="aboutWindow__button">
              projects repository.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
