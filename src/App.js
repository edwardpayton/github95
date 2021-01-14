import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";

import Desktop from "./views/Desktop";
import Login from "./views/Login";

import { useGeneralApi } from "./githubApi";
import { menubarButtons, focusedElement } from "./store";

import "./App.css";

const ResetStyles = createGlobalStyle`
  ${styleReset}
`;

function AppWrapper() {
  const [focused, setfocused] = useRecoilState(focusedElement);
  const currentButtons = useRecoilValue(menubarButtons);
  const [showDesktop, setShowDesktop] = React.useState(false);

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

  const handleLogin = () => {
    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);
    setShowDesktop(true);
  };

  React.useEffect(() => {
    getApiLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{showDesktop ? <Desktop /> : <Login onLogin={handleLogin} />}</>;
}

const App = () => {
  return (
    <RecoilRoot>
      <ResetStyles />
      <ThemeProvider theme={original}>
        <AppWrapper />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
