import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import { windowObj } from "../../store";

export default function RepoWindow({ id }) {
  const currentWindows = useRecoilValue(windowObj);

  React.useEffect(() => {
    console.log(
      "~/Sites/github95/src/components/RepoWindow/index >>>",
      id,
      currentWindows[id]
    );
  }, [id]);

  return <p>Repo window: {id}</p>;
}
