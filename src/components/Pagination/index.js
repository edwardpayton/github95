import React from "react";
import PropTypes from "prop-types";
import { Button } from "react95";

import "./styles.scss";

export default function Pagination({ onPageChange, totalCount, perPage = 20 }) {
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotal] = React.useState(
    Math.ceil(totalCount / perPage)
  );

  const actions = {
    prev: -1,
    next: +1,
  };

  const handleClick = (direction) => () => {
    const count = actions[direction];
    onPageChange(page + count);
    setPage(page + count);
  };

  React.useEffect(() => {
    setTotal(Math.ceil(totalCount / perPage));
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);
  // 'totalCount' - bug when used - should be included but it causes pagination to be reset if a new repo is created between pages
  // (eg searching react and someone created my-cool-react-library makes totalCount go up by 1).
  // The total pages wont be completely accurate, but close enough

  return (
    <nav className="pagination">
      <ul className="flex justify-center items-center pagination__list">
        <li>
          <Button onClick={handleClick("prev")} disabled={page === 0}>
            Prev
          </Button>
        </li>
        <li>
          <p className="pagination__details">
            Page {page + 1} of {totalPages}
          </p>
        </li>
        <li>
          <Button
            onClick={handleClick("next")}
            disabled={page + 1 === totalPages}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}
