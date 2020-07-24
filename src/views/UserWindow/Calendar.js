import React from "react";
// import { HeatMap } from "../../components/Charts";

export default function Calendar({ activity }) {
  return (
    <div>
      <p>
        {activity.contributions.total} contributions since{" "}
        {activity.contributions.start}
      </p>
      {activity.contributions.busiestDay.num > 0 && (
        <p>
          The maximum contributions in one day was{" "}
          <span>{activity.contributions.busiestDay.num}</span> on{" "}
          <span>{activity.contributions.busiestDay.date}</span>
        </p>
      )}
    </div>
  );
}
