const dateOptions = {
  year: "numeric",
  month: "short",
};
/**
 * Returns a readable date
 * eg "Mon, 1 Jan 2000", "1 Jan 2000", or (default) "Jan 2000"
 * (if the weekday is included, the date will also be included)
 * @param {string} date - a JS date
 * @param {boolean} incDay - option to include the date number
 * @param {boolean} incWeekday - option to include the day name
 */
export default function formatDate(date, incDay = false, incWeekday = false) {
  const _incDate = incDay || incWeekday;
  const options = {
    ...dateOptions,
    ...(_incDate && { day: "numeric" }),
    ...(incWeekday && { weekday: "short" }),
  };
  return new Date(date).toLocaleDateString(undefined, options);
}
