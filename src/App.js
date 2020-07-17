import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import Desktop from "./views/Desktop";
import StartupSound from "./components/StartupSound";

import { useGeneralApi } from "./githubApi";
import { menubarButtons, focusedElement } from "./store";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [focused, setfocused] = useRecoilState(focusedElement);
  const currentButtons = useRecoilValue(menubarButtons);

  const { getApiLimit } = useGeneralApi();

  const handleClick = React.useCallback(
    (e) => {
      if (e.target.dataset && e.target.dataset.name === "start-menu") return;
      const closest = e.target.closest("[data-name]");
      if (!closest) return setfocused("");
      const { name } = closest.dataset;
      setfocused(name);
    },
    [focused, setfocused, currentButtons]
  );

  React.useEffect(() => {
    getApiLimit();
    document.addEventListener("click", handleClick);
  }, []);

  return <Desktop />;
}

export default () => {
  const [soundStorage, _] = useLocalStorage("github95_noSound");

  return (
    <RecoilRoot>
      <ResetStyles />
      {soundStorage !== "Off" && <StartupSound />}
      <ThemeProvider theme={themes.default}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
};
