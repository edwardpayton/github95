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
          <p className="mb2">
            Welcome to Github95 - where you can browse Github without the
            distractions of a modern website. Rewind to a time where the
            experience was simpler, grey, and so pixelated you needed to squint!
          </p>

          <p>Built with these libraries and resources:</p>
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
          </ul>
          <p className="mb2">
            As well as{" "}
            <Anchor
              href="https://artage.io/en/icon-packs/original-windows-95-icons"
              target="_blank"
            >
              Windows 95 style icons
            </Anchor>{" "}
            from Artage.
          </p>

          <p className="mb2">
            This project was built just for fun to view repositories and users,
            and it works best on desktop browsers but will also work on tablets.
          </p>
          <p className="mb2">
            New features will be added from time to time. I plan to add the
            users profile readme, and also use the Github OAuth api to login so
            you can login to your Github account, as well as better error
            handling and performance improvements.
          </p>

          <p className="mb2">
            Find out more in the{" "}
            <button
              onClick={handleClick}
              data-name="edwardpaytongithub95"
              className="aboutWindow__button"
            >
              projects repository
            </button>
            , clone or fork the code on{" "}
            <Anchor
              href="https://github.com/edwardpayton/github95"
              target="_blank"
            >
              Github
            </Anchor>
            , and please report any{" "}
            <Anchor
              href="https://github.com/edwardpayton/github95/issues"
              target="_blank"
            >
              issues
            </Anchor>
            .
          </p>

          <p className="mb2">
            Finally, Happy Birthday to Windows 95, first announced on 24th
            August 1995 - a quarter-century young. Long live Windows 95!
          </p>
          <img
            src={require("../../assets/windows95-announcement.gif")}
            alt=""
          />

          <p className="mt2">All the best, Edward Payton :)</p>
        </div>
      </div>
    </section>
  );
}
