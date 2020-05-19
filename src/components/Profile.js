import React from "react";
import { Window, WindowContent, WindowHeader, Button } from "react95";
import Draggable from "react-draggable";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData, searchInput } from "../store";

import Search from "./Search";
import ProfileContent from "./ProfileContent";

import { getUserApi, getReposApi } from "../data/githubApiNew";
import { windowList } from "../hooks/sharedStates";

export default function Profile() {
  const [{ profile }, set] = windowList();
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);
  const refWindow = React.useRef(undefined);
  const [focused, setFocused] = React.useState(true);

  const _getUser = React.useCallback(async () => {
    const result = await getUserApi(searchInputValue);
    if (result instanceof Error) {
      console.error("ERROR", result);
    }
    const newUserData = { ...user, profile: result };
    setUser(newUserData);
  }, [searchInputValue]);

  const getRepos = React.useCallback(async () => {
    const result = await getReposApi(user.profile["login"]);
    const newUserData = { ...user, repos: result };
    setUser(newUserData);
  }, [user]);

  React.useEffect(() => {
    searchInputValue.length && _getUser();
  }, [searchInputValue]);

  React.useEffect(() => {
    if (user.repos.length) console.log("REPOS", user, user.repos);
  }, [user.repos]);

  const handleClose = () => {
    set({ profile: [false, false, false] });
  };

  const handleClick = ({ target }) => {
    if (target.type === "button") return;
    set({ profile: [true, true, true] });
    setFocused(true);
  };

  const handleClickOutside = ({ target }) => {
    const clickedWithin = refWindow.current.contains(target);
    if (!clickedWithin) {
      setFocused(false);
      set({ profile: [true, true, false] });
    }
  };

  const handleTabChange = (activeTab) => {
    if (activeTab === 2 && !user.repos.length) {
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
            {user && user.profile["name"] ? (
              <ProfileContent
                user={user.profile}
                onTabChange={handleTabChange}
              />
            ) : (
              <p>Not found</p>
            )}
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
