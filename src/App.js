import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, AppBar, Toolbar, TextField, Hourglass } from "react95";

import Menu from "./components/Menu";

import { callApiForUser, callApiForRepos } from "./utilities/data";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [isLoading, setLoading] = React.useState(null);
  const [hasErrored, setErrored] = React.useState(null);
  const [search, setSearch] = React.useState("");
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

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    if (user && user["name"] !== undefined) getRepos();
  }, [user, getRepos]);

  React.useEffect(() => {
    if (repos.length) console.log("REPOS", repos);
  }, [repos]);

  if (hasErrored) {
    return (
      <p>
        There was an error. This could be because the Github api has reached the
        rate limit. Wait 15 - 30 minutes and try again
      </p>
    );
  }

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
        <AppBar style={{ zIndex: 3 }}>
          <Toolbar className="flex justify-between">
            <Menu />
            <TextField
              placeholder="Search..."
              width={150}
              style={{ marginLeft: "auto" }}
              value={search}
              onChange={(val) => setSearch(val)}
            />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default App;
