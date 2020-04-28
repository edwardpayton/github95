import React from "react";
import { TextField, Button } from "react95";

import { userData } from "../hooks/sharedStates";

export default function Search() {
  const [{ searchInput }, setInput] = userData();
  const [state, setState] = React.useState(searchInput);

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleClick = () => {
    state.length > 0 && setInput({ searchInput: state });
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        placeholder="Search..."
        width={150}
        value={state}
        onChange={handleChange}
      />
      <Button onClick={handleClick} style={{ fontWeight: "bold" }}>
        Search
      </Button>
    </div>
  );
}
