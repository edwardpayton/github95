import React from "react";
import PropTypes from "prop-types";

import { AreaChart } from "../../components/Charts";

export default function ReposOverTime({ activity, total, startDate }) {
  if (total > 100)
    return (
      <p className="flex flex-column justify-around bevelBorder reposOverTime__badge">
        <span className="reposOverTime__badgeSegment -total">{total}</span>
        <span className="reposOverTime__badgeSegment -since">
          repos created since
        </span>
        <span className="reposOverTime__badgeSegment -date">{startDate}</span>
      </p>
    );
  return (
    <>
      {activity.repositories &&
      activity.repositories.monthsList &&
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

ReposOverTime.propTypes = {
  activity: PropTypes.object,
  total: PropTypes.number,
  startDate: PropTypes.string,
};

ReposOverTime.defaultProps = {
  activity: undefined,
  total: undefined,
  startDate: undefined,
};
