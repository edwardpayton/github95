import React from "react";
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Fieldset,
  Cutout,
} from "react95";
import Draggable from "react-draggable";

import Search from "./Search";

import { windowList, userData } from "../hooks/sharedStates";

export default function Profile() {
  const [{ profile }, set] = windowList();
  const [{ user, repos }] = userData();
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const handleClose = () => {
    set({ profile: [false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ profile: [true, true] });
    setFocused(true);
  };

  const handleClickFocus = ({ target }) => {
    const clickedWithin = refWindow.current.contains(target);
    if (!clickedWithin) setFocused(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickFocus);
    return () => {
      document.removeEventListener("mousedown", handleClickFocus);
    };
  }, []);

  React.useEffect(() => {
    console.log("~/Sites/github95/src/components/Profile >>>", repos);
  }, [repos]);

  return (
    <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
      <div
        ref={refWindow}
        className="fit"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          maxHeight: "100%",
          display: profile[1] ? "block" : "none",
          zIndex: focused ? 2 : 1,
        }}
      >
        <Window
          onClick={handleClick}
          shadow={focused}
          style={{ width: "100%", height: "100%" }}
        >
          <WindowHeader className="flex items-center justify-between handle">
            <span>Profile</span>
            <Button
              style={{ marginRight: -6, marginTop: 1 }}
              size={"sm"}
              square
              onClick={handleClose}
            >
              <span
                style={{
                  fontWeight: "bold",
                  transform: "translateY(-2px)",
                  pointerEvents: "none",
                }}
              >
                x
              </span>
            </Button>
          </WindowHeader>
          <WindowContent
            style={{
              padding: ".25rem",
              position: "absolute",
              left: 0,
              right: 0,
              top: 35,
              bottom: 0,
            }}
          >
            <Search onChange={(v) => console.log(v)} />
            <br />
            <Cutout
              style={{
                position: "absolute",
                top: 70,
                left: 2,
                bottom: 15,
                right: 2,
                padding: "1rem",
                background: "white",
              }}
            >
              {user && user["name"] && (
                <>
                  <img
                    src={user["avatarUrl"]}
                    alt="Github avatar"
                    width="100"
                    height="100"
                    className="square"
                  />
                  <p>name:{user["name"]}</p>
                  <p>login: {user["login"]}</p>
                  <p>email: {user["email"]}</p>
                  <p>bio: {user["bio"]}</p>
                  <p>location: {user["location"]}</p>
                  <p>html_url: {user["url"]}</p>
                  <p>created_at: {user["createdAt"]}</p>
                  <p>gists: {user["gists"] && user["gists"]["totalCount"]}</p>
                  <p>
                    repositories:{" "}
                    {user["repositories"] && user["repositories"]["totalCount"]}
                  </p>
                  <p>
                    followers:{" "}
                    {user["followers"] && user["followers"]["totalCount"]}
                  </p>
                  {/* <table>
                <tbody>
                  {repos.map((repo) => (
                    <tr>
                      <td>{repo["name"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
                </>
              )}
            </Cutout>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
