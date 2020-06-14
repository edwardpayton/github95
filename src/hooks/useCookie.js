import { useState } from "react";

const setCookie = (name, value) => {
  let date = new Date();
  date.setTime(+date + 365 * 86400000);
  const expires = date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export default function useCookie(name, initialValue) {
  const [state, set] = useState(() => {
    return getCookie(name) || initialValue;
  });

  const updateCookie = (value) => {
    set(value);
    setCookie(name, value);
  };

  return [state, updateCookie];
}
