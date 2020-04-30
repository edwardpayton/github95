import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, Hourglass } from "react95";

import Menubar from "./components/Menubar";
import Desktop from "./components/Desktop";
import Windows from "./components/Windows";

import { getUserApi } from "./data/githubApiNew";

import { userData } from "./hooks/sharedStates";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [isLoading, setLoading] = React.useState(null);
  const [hasErrored, setErrored] = React.useState(null);

  const [{ searchInput, user, repos }, setData] = userData();

  const _getUser = React.useCallback(async () => {
    hasErrored && setErrored(false);
    const result = await getUserApi(searchInput);
    if (result instanceof Error) {
      return setErrored(true);
    }
    return setData({ user: result.data.user });
  }, [searchInput]);

  const getRepos = React.useCallback(async () => {
    // const result = await callApiForRepos(user["repos_url"]);
    // setData({ repos: result });
  }, [user]);

  React.useEffect(() => {
    searchInput.length && _getUser();
  }, [searchInput]);

  React.useEffect(() => {
    if (user) console.log("USER", user);
    // if (user && user["name"] !== undefined) getRepos();
  }, [user, getRepos]);

  React.useEffect(() => {
    if (repos.length) console.log("REPOS", repos);
  }, [repos]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "90vh" }}
      >
        <Hourglass size={40} />
      </div>
    );
  }

  return (
    <>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <Menubar />
        <main>
          <section style={{ height: "100%" }}>
            <Desktop />
            {hasErrored && (
              <p>
                There was an error. This could be because the Github api has
                reached the rate limit. Wait 15 - 30 minutes and try again
              </p>
            )}
            <Windows />
          </section>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
