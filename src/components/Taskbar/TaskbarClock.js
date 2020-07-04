import React from "react";

export default function TaskbarClock() {
  const refClock = React.useRef(undefined);
  const refTimer = React.useRef(0);

  const clock = () => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const interval = (60 - date.getSeconds()) * 1000 + 5;
    const addZero = (t) => {
      if (t < 10) return `0${t}`;
      return t;
    };
    refTimer.current = window.setTimeout(() => {
      clock();
    }, interval);

    refClock.current.innerHTML = `${addZero(hour)}:${addZero(min)}`;
  };

  React.useEffect(() => {
    refClock && refClock.current && clock();
    return () => {
      window.clearTimeout(refTimer.current);
      refClock.current = null;
    };
  }, []);

  return <p ref={refClock} className="taskbarClock"></p>;
}
