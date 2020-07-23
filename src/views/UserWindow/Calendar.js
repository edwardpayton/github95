import React from "react";
// import { HeatMap } from "../../components/Charts";

export default function Calendar({ contributions, onComplete }) {
  return (
    <div>
      <p>
        {contributions.total} contributions since {contributions.start}
      </p>
      <p>
        The maximum contributions in one day was{" "}
        <span>{contributions.busiestDay.num}</span> on{" "}
        <span>{contributions.busiestDay.date}</span>
      </p>
      {/* <div>
        <p>Sat</p>
        <p>Sun</p>
      </div> */}
      {/* <HeatMap
        series={contributions.series}
        ranges={contributions.ranges}
        onComplete={onComplete}
      /> */}
      {/* <div>
        <p>{contributions.start}</p>
        <p>{contributions.end}</p>
      </div> */}
    </div>
  );
}
