import React from "react";

import { AreaChart } from "../../components/Charts";

export default function ReposOverTime({ activity }) {
  return (
    <>
      {activity.repositories.monthsList &&
      activity.repositories.monthsList.length > 0 ? (
        <AreaChart
          data={activity.repositories.repoTotals}
          labels={activity.repositories.monthsList}
        />
      ) : (
        <p>This user has 0 repositories</p>
      )}
    </>
  );
}
