import formatDate from "./formatDate";

export default function (activity) {
  const { contributionsCollection, repositories } = activity;
  if (repositories === undefined) return repositories;

  return {
    contributions: heatMap(contributionsCollection),
    repositories: areaChart(repositories),
  };
}

/**
 * Process the users contributionsCollection into two arrays
 * - series (a list of contributions per day for each week of the year)
 * - ranges (a list of colors for the heatMap - 6 steps between 0 & max number of daily contributions)
 * Also returns
 * - total (number)
 * - start (formatted date)
 * - end (formatted date)
 */
function heatMap({ contributionCalendar, startedAt, endedAt }) {
  const { totalContributions, weeks } = contributionCalendar;
  const series = [
    {
      name: "Mon",
      data: [],
    },
    {
      name: "Tues",
      data: [],
    },
    {
      name: "Wed",
      data: [],
    },
    {
      name: "Thurs",
      data: [],
    },
    {
      name: "Fri",
      data: [],
    },
    {
      name: "Sat",
      data: [],
    },
    {
      name: "Sun",
      data: [],
    },
  ];
  const numArray = [];
  weeks.forEach(({ contributionDays }) => {
    let i = 0;
    do {
      series[i].data.push({
        x: formatDate(contributionDays[i].date),
        y: contributionDays[i].contributionCount,
      });
      numArray.push({
        date: formatDate(contributionDays[i].date),
        num: contributionDays[i].contributionCount,
      });
      i++;
    } while (contributionDays[i] !== undefined);
  });
  const busiestDay = numArray.sort((a, b) => a.num - b.num).reverse()[0];
  const createPoint = (point) => {
    return Math.ceil(busiestDay.num / point);
  };
  const ranges = [
    {
      from: 0,
      to: 0,
      color: "#f7f7f7",
      name: "",
    },
    {
      from: 1,
      to: createPoint(4),
      color: "#bacaf4",
      name: "",
    },
    {
      from: createPoint(4),
      to: createPoint(3),
      color: "#7897e9",
      name: "",
    },
    {
      from: createPoint(3),
      to: createPoint(2),
      color: "#3665de",
      name: "",
    },
    {
      from: createPoint(2),
      to: createPoint(1) - 1,
      color: "#1c44ac",
      name: "",
    },
    {
      from: busiestDay.num,
      to: busiestDay.num + 1,
      color: "#2ecaa3",
      name: "",
    },
  ];

  const start = formatDate(startedAt);
  const end = formatDate(endedAt);
  return { series, total: totalContributions, start, end, busiestDay, ranges };
}

/**
 * Process users repositories into two arrays
 * - monthsList (the list of months since the user was created)
 * - repoTotals (the number of repos that user had during that month)
 * eg if a user was created in month 1 and created their first repo in month 4,
 * repo totals would be [0,0,0,1]
 */
function areaChart({ nodes }) {
  const firstRepo = new Date(nodes[0].createdAt);
  const today = new Date();
  let monthsSinceFirstRepo =
    today.getFullYear() * 12 +
    today.getMonth() -
    (firstRepo.getFullYear() * 12 + firstRepo.getMonth());
  monthsSinceFirstRepo = monthsSinceFirstRepo + 2; // TODO whats happening here? why is 'monthsSinceFirstRepo' not correct?
  const monthsList = Array.from(Array(monthsSinceFirstRepo).keys())
    .map((key) => {
      var curr = new Date().getTime();
      var prevDate = curr - Number(key) * 30 * 24 * 60 * 60 * 1000;
      var d = new Date();
      d.setTime(prevDate);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      return `${year}-${month}`;
    })
    .reverse();

  const dateGroups = nodes.reduce((groups, repo) => {
    const month = repo.createdAt.split("-").slice(0, 2).join("-");
    if (!groups[month]) groups[month] = [];
    groups[month].push(repo.name);
    return groups;
  }, {});

  let count = 0;
  const repoTotals = monthsList.map((month) => {
    count += dateGroups[month] ? dateGroups[month].length : 0;
    return count;
  });

  return { monthsList, repoTotals };
}
