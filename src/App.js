import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, Hourglass } from "react95";

import Menubar from "./components/Menubar";
import Desktop from "./components/Desktop";
import Windows from "./components/Windows";
import StartupSound from "./components/StartupSound";

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
    return setData({ user: result });
  }, [searchInput]);

  React.useEffect(() => {
    searchInput.length && _getUser();
  }, [searchInput]);

  React.useEffect(() => {
    if (user) console.log("USER", user);
  }, [user]);

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
        <StartupSound />
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
