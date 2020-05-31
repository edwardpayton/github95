export default function formatApiContributions(data) {
  if (data === undefined) return data;
  const { totalContributions, weeks } = data.contributionCalendar;

  const calendar = weeks.map(({ contributionDays }, i) => {
    return {
      weeknum: i,
      contributionDays,
    };
  });

  return {
    totalContributions,
    calendar,
  };
}
