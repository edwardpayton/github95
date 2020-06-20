import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import Desktop from "./components/Desktop";
import StartupSound from "./components/StartupSound";

import { menubarButtons, focusedElement } from "./store";
import useCookie from "./hooks/useCookie";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [focused, setfocused] = useRecoilState(focusedElement);
  const currentButtons = useRecoilValue(menubarButtons);
  const handleClick = React.useCallback(
    (e) => {
      console.log("src/App >>> duplicate event listeners?");
      if (e.target.dataset && e.target.dataset.name === "start-menu") return;
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

  return <Desktop />;
}

export default () => {
  const [soundCookie, _] = useCookie("github95_noSound");

  return (
    <RecoilRoot>
      <ResetStyles />
      {soundCookie === "On" && <StartupSound />}
      <ThemeProvider theme={themes.default}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
};
