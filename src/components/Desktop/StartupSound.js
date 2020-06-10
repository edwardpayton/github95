import React from "react";
import { useRecoilValue } from "recoil";

import { Howl } from "howler";
import { startupSound } from "../../store";
import useCookie from "../../hooks/useCookie";

export default function StartupSound() {
  const [soundCookie, setCookie] = useCookie("github95_noSound", false);

  const refSound = React.useRef(undefined);

  React.useEffect(() => {
    refSound.current = new Howl({
      // @ts-ignore
      src: [require("../../assets/startup-sound.wav")],
      volume: 0.5,
      onend: () => {
        refSound.current = null;
      },
    });
    refSound.current.once("load", function () {
      this.play();
    });
  }, []);

  return null;
}
