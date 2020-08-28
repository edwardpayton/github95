import React from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  TextField,
  Button,
} from "react95";
import { useRecoilValue } from "recoil";

import ErrorPopup from "../../components/ErrorPopup";

import { apiLimit } from "../../store";

import "./styles.scss";

export default function Login({ onLogin }) {
  const limit = useRecoilValue(apiLimit);
  const [showError, setShowError] = React.useState(false);

  const handleClick = () => {
    if (limit.exceeded) {
      return setShowError(true);
    } else onLogin();
  };

  return (
    <div className="flex justify-center items-center login">
      <Window
        shadow={true}
        className="flex-column windowFrame__inner login__window"
      >
        <WindowHeader className="flex items-center justify-between handle">
          <span>Welcome to Github95</span>
          <Button size={"sm"} square disabled={false} onClick={() => ""}>
            <span
              style={{
                fontWeight: "bold",
                transform: "translateY(-1px)",
              }}
            >
              x
            </span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <div className="flex">
            <img
              src={require(`../../assets/password.png`)}
              alt=""
              className="pl1 pr3 pixelated login__image"
            />
            <div>
              <p className="pb2">Click OK to log on to Github95</p>
              <div className="relative">
                <div className="absolute login__inputOverlay"></div>
                <div className="flex pb1 login__input">
                  <p>User name:</p>
                  <TextField value="Admin" onChange={() => ""} />
                </div>
                <div className="flex login__input">
                  <p>Password</p>
                  <TextField value="*******" onChange={() => ""} />
                </div>
              </div>
            </div>
            <div className="pl3 login__button">
              <Button onClick={handleClick}>OK</Button>
            </div>
          </div>
        </WindowContent>
      </Window>

      {showError && (
        <ErrorPopup
          header="Github95 has encountered an error"
          dismissable={false}
        >
          <p className="pb1">
            Unfortunately you cannot access Github95 now because the api rate
            limit has been exceeded.
          </p>
          <p>Please try again after {limit.resetAt}.</p>
        </ErrorPopup>
      )}
    </div>
  );
}
