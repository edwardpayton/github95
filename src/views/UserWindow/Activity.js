import React from "react";
import { HeatMap } from "../../components/Charts";

import formatDate from "../../utilities/formatDate";

export default function Activity({ data }) {
  const [showChart, setShow] = React.useState(false);

  React.useEffect(() => {
    let show = false;
    if (data && data.total !== 0) show = true;
    setShow(show);
  }, [data]);

  return (
    <div className="activity">
      {data && data.total > 0 ? (
        <ul className="activity__list">
          <li>
            {data.total} contributions since {data.start}
          </li>
          <li>
            Busiest on {data.busiestDayOfWeek[0].day}s,{" "}
            {data.busiestDayOfWeek[0].percent}% of all activity on that day.
          </li>
          <li>
            The busiest single day was{" "}
            <span>{formatDate(data.busiestSingleDay.x)}</span>, with{" "}
            <span className="badge -small">{data.busiestSingleDay.v}</span>{" "}
            contributions.
          </li>
        </ul>
      ) : (
        <p>No activity within the last 12 months</p>
      )}
      {showChart && <HeatMap data={data} />}
    </div>
  );
}
