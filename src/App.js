import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, Hourglass } from "react95";

import Menubar from "./components/Menubar";
import Windows from "./components/Windows";

import { callApiForUser, callApiForRepos } from "./utilities/data";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [isLoading, setLoading] = React.useState(null);
  const [hasErrored, setErrored] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [repos, setRepos] = React.useState([]);

  const getUser = React.useCallback(async () => {
    setLoading(true);
    hasErrored && setErrored(false);
    const result = await callApiForUser("edwardpayton");
    setLoading(false);
    if (result instanceof Error) {
      return setErrored(true);
    }
    return setUser(result);
  }, []);

  const getRepos = React.useCallback(async () => {
    const bbbb = await callApiForRepos(user["repos_url"]);
    setRepos(bbbb);
  }, [user]);

  // React.useEffect(() => {
  //   getUser();
  // }, []);

  React.useEffect(() => {
    if (user && user["name"] !== undefined) getRepos();
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
          <div className="container pt4">
            <Windows />
            <br />
            <br />
            <div className="clearfix mxn1">Profile:</div>{" "}
            {hasErrored && (
              <p>
                There was an error. This could be because the Github api has
                reached the rate limit. Wait 15 - 30 minutes and try again
              </p>
            )}
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
