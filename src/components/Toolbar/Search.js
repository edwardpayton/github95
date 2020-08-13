import React from "react";
import { TextField, Button } from "react95";

export default function Search({ placeholder, initalValue, onSearch }) {
  const [state, setState] = React.useState(initalValue);

  React.useEffect(() => {
    if (initalValue !== state) setState(initalValue);
  }, [initalValue]);

  const handleChange = ({ target }) => {
    setState(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.length > 0 && onSearch(state);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center searchForm">
      <TextField
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
        className="searchForm__input"
      />
      <Button onClick={handleSubmit} className="searchForm__button">
        Search
      </Button>
    </form>
  );
}
