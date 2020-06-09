import React from "react";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import Taskbar from "./components/Taskbar/";
import Desktop, { Windows, StartupSound } from "./components/Desktop";

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
            <Windows />
          </section>
        </main>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
