import React from "react";
import { HeatMap } from "../../components/Charts";

export default function Calendar({ contributions }) {
  return (
    <div>
      <p>{contributions.total} contributions in the last 12 months</p>
      <p>
        The maximum contributions in one day was{" "}
        <span>{contributions.busiestDay.num}</span> on{" "}
        <span>{contributions.busiestDay.date}</span>
      </p>
      <div>
        <p>Sat</p>
        <p>Sun</p>
      </div>
      <HeatMap data={contributions} />
      <div>
        <p>{contributions.start}</p>
        <p>{contributions.end}</p>
      </div>
    </div>
  );
}
