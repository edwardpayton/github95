import React from "react";
import { HeatMap } from "../../components/Charts";

export default function Calendar({ data }) {
  const [showChart, setShow] = React.useState(false);

  React.useEffect(() => {
    let show = false;
    if (data && data.total !== 0) show = true;
    setShow(show);
    console.log("UserWindow/Calendar >>>", data);
  }, [data]);

  return (
    <div className="calendar">
      {/* <p>
        {activity.contributions.total} contributions since{" "}
        {activity.contributions.start}
      </p>
      {activity.contributions.busiestDay.num > 0 && (
        <p>
          The maximum contributions in one day was{" "}
          <span>{activity.contributions.busiestDay.num}</span> on{" "}
          <span>{activity.contributions.busiestDay.date}</span>
        </p>
      )} */}
      {showChart && <HeatMap data={data} />}
    </div>
  );
}
