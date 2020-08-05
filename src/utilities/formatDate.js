/**
 * Returns a readable date (and time)
 * @param {string}  date - a JS date
 * @param {object} options - {time, day, weekday, month, year} - the date and time parts to return
 *
 * Options:
 * day      true, false, "numeric", "2-digit"
 * weekday  true, false, "narrow", "short", "long"
 * month    true, false, "numeric", "2-digit", "narrow", "short", "long"
 * year     true, false, "numeric", "2-digit"
 * time     true, false
 *
 * @returns a formatted date, eg:
 *  "Mon, 1 Jan 2000, 12:00"
 *  "Mon, 1 Jan 2000"
 *  "1 Jan, 12:00"
 *  "1 Jan"
 *  (default) "1 Jan 2000"
 *
 * - if the weekday is included, the date will also be included
 * - if date & year are included, month is also included
 */
const defaults = {
  weekday: false,
  day: true,
  month: true,
  year: true,
  time: false,
};
export default function formatDate(date, options) {
  const parts = { ...defaults, ...options };

  const incWeekday = Boolean(parts.weekday);
  const incDate = Boolean(parts.day) || Boolean(parts.weekday);
  const incMonth = Boolean(parts.month) || (incDate && Boolean(parts.year));
  const incYear = Boolean(parts.year);

  const weekday = typeof parts.weekday === "boolean" ? "short" : parts.weekday;
  const day = typeof parts.day === "boolean" ? "numeric" : parts.day;
  const month = typeof parts.month === "boolean" ? "short" : parts.month;
  const year = typeof parts.year === "boolean" ? "numeric" : parts.year;

  const dateOptions = {
    ...(incWeekday && { weekday }),
    ...(incDate && { day }),
    ...(incMonth && { month }),
    ...(incYear && { year }),

    ...(parts.time && { hour: "2-digit", minute: "2-digit" }),
  };

  return new Date(date).toLocaleDateString(undefined, dateOptions);
}
