import React from "react";

export default function MenubarClock() {
  const refClock = React.useRef(undefined);
  const refTimer = React.useRef(0);

  const clock = () => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const addZero = (t) => {
      if (t < 10) return `0${t}`;
      return t;
    };
    refTimer.current = window.setTimeout(() => {
      clock();
    }, 1000);

    refClock.current.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(
      sec
    )}`;
  };

  React.useEffect(() => {
    refClock && refClock.current && clock();
    return () => {
      window.clearTimeout(refTimer.current);
      refClock.current = null;
    };
  }, []);

  return <p ref={refClock}></p>;
}
