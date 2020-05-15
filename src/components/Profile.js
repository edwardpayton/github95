import React from "react";
import { Window, WindowContent, WindowHeader, Button } from "react95";
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
    set({ profile: [false, false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ profile: [true, true, true] });
    setFocused(true);
  };

  const handleClickOutside = (e) => {
    e.stopPropagation();
    const clickedWithin = refWindow.current.contains(e.target);
    if (!clickedWithin) {
      setFocused(false);
    }
  };

  const handleTabChange = (activeTab) => {
    if (activeTab === 2 && !repos.length) {
      getRepos();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Draggable positionOffset={{ x: "-50%", y: "-50%" }} handle=".handle">
      <div
        ref={refWindow}
        className="fit profile-window"
        style={{
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
              className="windowButton"
              style={{ marginRight: -6, marginTop: 1 }}
              size={"sm"}
              square
              onClick={handleClose}
            >
              <span className="windowButton-icon -close">x</span>
            </Button>
          </WindowHeader>
          <WindowContent
            style={{
              padding: ".25rem",
              height: "calc(100% - 55px)",
            }}
            className="flex flex-column"
          >
            <Search />
            {user && user["name"] ? (
              <ProfileContent user={user} onTabChange={handleTabChange} />
            ) : (
              <p>Not found</p>
            )}
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
