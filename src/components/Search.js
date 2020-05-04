import React from "react";
import { TextField, Button, Bar } from "react95";

import { userData } from "../hooks/sharedStates";

export default function Search() {
  const [{ searchInput }, setInput] = userData();
  // const [state, setState] = React.useState(searchInput);
  const [state, setState] = React.useState("edwardpayton");

  const handleChange = (e) => {
    setState(e.target.value.trim());
  };

  const handleClick = () => {
    state.length > 0 && setInput({ searchInput: state });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.length > 0 && setInput({ searchInput: state });
  };

  return (
    <div className="flex profileSearch">
      <Bar />
      <p style={{ paddingLeft: 5, width: 60, lineHeight: "14px" }}>
        Search username
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", width: "100%", paddingLeft: 5 }}
      >
        <TextField
          placeholder="about:blank"
          width="100%"
          value={state}
          onChange={handleChange}
        />
        <Button
          onClick={handleClick}
          style={{ fontWeight: "bold", padding: "0 .6rem" }}
        >
          Go
        </Button>
      </form>
    </div>
  );
}
