import React from "react";
import { TextField, Button } from "react95";

export default function Search({ onChange }) {
  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    input.length >= 3 && onChange(input);
  };

  return (
    <>
      <TextField
        placeholder="Search..."
        width={150}
        style={{ marginLeft: "auto" }}
        value={input}
        onChange={(val) => handleChange(val)}
      />
      <Button onClick={handleClick} style={{ fontWeight: "bold" }}>
        Search
      </Button>
    </>
  );
}
