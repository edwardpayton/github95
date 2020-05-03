import React from "react";
import { Window, WindowContent, WindowHeader, Button, Cutout } from "react95";
import Draggable from "react-draggable";

import Search from "./Search";
import ProfileContent from "./ProfileContent";

import { getUserApi, getReposApi } from "../data/githubApiNew";
import { windowList, userData } from "../hooks/sharedStates";

export default function Profile() {
  const [{ profile }, set] = windowList();
  const [{ searchInput, user, repos }, setData] = userData();
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const _getUser = React.useCallback(async () => {
    const result = await getUserApi(searchInput);
    if (result instanceof Error) {
      console.error("ERROR", result);
    }
    return setData({ user: result });
  }, [searchInput, setData]);

  const getRepos = React.useCallback(async () => {
    const result = await getReposApi(user["login"]);
    setData({ repos: result });
  }, [user, setData]);

  React.useEffect(() => {
    searchInput.length && _getUser();
  }, [searchInput]);

  React.useEffect(() => {
    if (repos.length) console.log("REPOS", repos);
  }, [repos]);

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

  const handleTabChange = (activeTab) => {
    console.log(
      "~/Sites/github95/src/components/Profile >>>",
      activeTab,
      repos
    );
    if (activeTab === 1 && !repos.length) {
      getRepos();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickFocus);
    return () => {
      document.removeEventListener("mousedown", handleClickFocus);
    };
  }, []);

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
            <Search />
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
                <ProfileContent user={user} onTabChange={handleTabChange} />
              )}
            </Cutout>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
