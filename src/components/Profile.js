import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData, searchInput } from "../store";

import Search from "./Search";
import ProfileContent from "./ProfileContent";

import { getUserApi, getReposApi } from "../data/githubApiNew";

export default function Profile() {
  const [user, setUser] = useRecoilState(userData);
  const searchInputValue = useRecoilValue(searchInput);

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

  // const handleClose = () => {
  //   setList({ ...list, profile: [false, false, false] });
  // };

  // const handleClick = ({ target }) => {
  //   if (target.type === "button") return;
  //   setList({ ...list, profile: [true, true, true] });
  //   setFocused(true);
  // };

  // const handleClickOutside = ({ target }) => {
  //   const clickedWithin = refWindow.current.contains(target);
  //   if (!clickedWithin) {
  //     setFocused(false);
  //     setList({ ...list, profile: [true, true, false] });
  //   }
  // };

  // const handleTabChange = (activeTab) => {
  //   if (activeTab === 2 && !user.repos.length) {
  //     getRepos();
  //   }
  // };

  // React.useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <Search />
      {user && user.profile["name"] ? (
        <ProfileContent user={user.profile} onTabChange={handleTabChange} />
      ) : (
        <p>Not found</p>
      )}
    </>
  );
}
