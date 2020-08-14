import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";

import Desktop from "./views/Desktop";
import StartupSound from "./components/StartupSound";

import { useGeneralApi } from "./githubApi";
import { menubarButtons, focusedElement } from "./store";
import useLocalStorage from "./hooks/useLocalStorage";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${styleReset}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focused, setfocused, currentButtons]
  );

  React.useEffect(() => {
    getApiLimit();
    document.addEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Desktop />;
}

export default () => {
  // eslint-disable-next-line no-unused-vars
  const [soundStorage, _] = useLocalStorage("github95_noSound");

  return (
    <RecoilRoot>
      <ResetStyles />
      {soundStorage !== "Off" && <StartupSound />}
      <ThemeProvider theme={original}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
};
