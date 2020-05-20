import React from "react";
import { TextField, Button } from "react95";
import { useSetRecoilState } from "recoil";
import { searchInput } from "../store";

export default function SearchInput() {
  const setInput = useSetRecoilState(searchInput);
  const [state, setState] = React.useState("edwardpayton");

  const handleChange = ({ target }) => {
    setState(target.value.trim());
  };

  const handleClick = () => {
    state.length > 0 && setInput(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.length > 0 && setInput(state);
  };

  return (
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
  );
}
