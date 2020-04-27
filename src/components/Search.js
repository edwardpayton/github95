import React from "react";
import { TextField, Button } from "react95";

import { searchValue } from "../hooks/sharedStates";

export default function Search() {
  const [{ searchInput }, setInput] = searchValue();
  const [state, setState] = React.useState(searchInput);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleClick = () => {
    state.length >= 3 && setInput({ searchInput: state });
  };

  return (
    <>
      <TextField
        placeholder="Search..."
        width={150}
        style={{ marginLeft: "auto" }}
        value={state}
        onChange={handleChange}
      />
      <Button onClick={handleClick} style={{ fontWeight: "bold" }}>
        Search
      </Button>
    </>
  );
}
