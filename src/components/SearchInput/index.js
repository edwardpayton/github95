import React from "react";
import PropTypes from "prop-types";

import { TextField, Button } from "react95";

export default function SearchInput({ placeholder, initalValue, onSearch }) {
  const [state, setState] = React.useState(initalValue);

  React.useEffect(() => {
    if (initalValue !== state) setState(initalValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initalValue]);
  // 'state' - causes infinate re-renders

  const handleChange = ({ target }) => {
    setState(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.length > 0 && onSearch(state);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center searchInput">
      <TextField
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
        className="searchInput__input"
      />
      <Button onClick={handleSubmit} className="searchInput__button">
        Search
      </Button>
    </form>
  );
}
SearchInput.propTypes = {
  placeholder: PropTypes.string,
  initalValue: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  placeholder: "",
  initalValue: "",
};
