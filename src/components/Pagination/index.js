import React from "react";
import PropTypes from "prop-types";

export default function Pagination({ onPageChange, totalCount, perPage = 20 }) {
  const [page, setPage] = React.useState(0);
  const refTotalPages = React.useRef(Math.ceil(totalCount / perPage));

  const actions = {
    prev: -1,
    next: +1,
  };

  const handleClick = (direction) => () => {
    const count = actions[direction];
    onPageChange(page + count);
    setPage(page + count);
  };

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li>
          <button
            onClick={handleClick("prev")}
            className="pagination__button -prev"
            disabled={page === 0}
          >
            Prev
          </button>
        </li>
        <li>
          <button
            onClick={handleClick("next")}
            className="pagination__button"
            disabled={page + 1 === refTotalPages.current}
          >
            Next
          </button>
        </li>
      </ul>
      <p className="pagination__details">
        Page {page + 1} of {refTotalPages.current}
      </p>
    </nav>
  );
}
