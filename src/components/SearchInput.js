import React from "react";
import { TextField, Button } from "react95";

export default function SearchInput({ onChange }) {
  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    input.length > 3 && onChange(input);
  };

  return (
    <>
      <TextField placeholder="Username" onChange={handleChange} />
      <Button onClick={handleClick}>Search</Button>
    </>
  );
}
