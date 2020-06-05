import React from "react";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import Taskbar from "./components/Taskbar/";
import Desktop from "./components/Desktop";
import Windows from "./components/Windows";
import StartupSound from "./components/StartupSound";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <RecoilRoot>
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        {/* <StartupSound /> */}
        <Taskbar />
        <main>
          <section style={{ height: "100%" }}>
            <Desktop />
            {/* {hasErrored && (
              <p>
                There was an error. This could be because the Github api has
                reached the rate limit. Wait 15 - 30 minutes and try again
              </p>
            )} */}
            <Windows />
          </section>
        </main>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
