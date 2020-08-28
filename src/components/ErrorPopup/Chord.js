import React from "react";

import { Howl } from "howler";

export default function Chord() {
  const refSound = React.useRef(undefined);

  React.useEffect(() => {
    refSound.current = new Howl({
      // @ts-ignore
      src: [require("../../assets/chord.wav")],
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
