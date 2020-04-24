import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import SearchInput from "./components/SearchInput";

import { callApiForUser, callApiForRepos } from "./utilities/data";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [user, setUser] = React.useState({});
  const [repos, setRepos] = React.useState([]);
  const [hasErrored, setErrored] = React.useState(null);

  const getUser = React.useCallback(async () => {
    hasErrored && setErrored(false);
    const aaa = await callApiForUser("edwardpayton");
    if (aaa instanceof Error) {
      return setErrored(true);
    }
    return setUser(aaa);
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

  return (
    <>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <div className="App">
          {user && user["name"] && <p>{user["name"]}</p>}
          <SearchInput onChange={(v) => console.log(v)} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
