import React from "react";
import { Button } from "react95";

export default function Login({ onLogin }) {
  const handleClick = () => {
    console.log("Login/index >>>");
    onLogin();
  };

  return (
    <>
      <Button onClick={handleClick}>login</Button>
    </>
  );
}
