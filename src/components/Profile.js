import React from "react";
import { Window, WindowContent, WindowHeader, Button, Fieldset } from "react95";
import Draggable from "react-draggable";

import Search from "./Search";

import { openWindows, userData } from "../hooks/sharedStates";

export default function Profile() {
  const [{ profile }, set] = openWindows();
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
    <div ref={refWindow}>
      <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
        <Window
          onClick={handleClick}
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
          shadow={focused}
          className="fit"
        >
          <WindowHeader className="flex items-center justify-between handle">
            <span>Profile</span>
            <Button
              style={{ marginRight: "-6px", marginTop: "1px" }}
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
          <WindowContent>
            <Search onChange={(v) => console.log(v)} />
            <br />
            <Fieldset>
              <img
                src={user["avatar_url"]}
                alt="Github avatar"
                width="100"
                height="100"
                className="circle"
              />
              <p>name:{user["name"]}</p>
              <p>login: {user["login"]}</p>
              <p>bio: {user["bio"]}</p>
              <p>location: {user["location"]}</p>
              <p>html_url: {user["html_url"]}</p>
              <p>created_at: {user["created_at"]}</p>
              <p>public_gists: {user["public_gists"]}</p>
              <p>public_repos: {user["public_repos"]}</p>
              {/* <table>
                <tbody>
                  {repos.map((repo) => (
                    <tr>
                      <td>{repo["name"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </Fieldset>
          </WindowContent>
        </Window>
      </Draggable>
    </div>
  );
}
