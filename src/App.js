import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import Taskbar from "./components/Taskbar/";
import Desktop, { Windows, StartupSound } from "./components/Desktop";

import { menubarButtons, focusedElement } from "./store";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function AppWrapper() {
  const [focused, setfocused] = useRecoilState(focusedElement);
  const currentButtons = useRecoilValue(menubarButtons);
  const handleClick = React.useCallback(
    (e) => {
      console.log("src/App >>> duplicate event listeners?");
      const closest = e.target.closest("[data-name]");
      if (!closest) return setfocused("");
      const { name } = closest.dataset;
      setfocused(name);
    },
    [focused, setfocused, currentButtons]
  );

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);

  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <AppWrapper />
    </RecoilRoot>
  );
}
