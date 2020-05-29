/**
 * Returns a readable date (and time)
 * @param {string}  date - a JS date
 * @param {object} parts - {time, day, weekday, month, year} - the date and time parts to return
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
export default function formatDate(
  date,
  parts = { time: false, day: true, weekday: false, month: true, year: true }
) {
  const incDate = parts.day || parts.weekday;
  const incMonth = parts.month || (incDate && parts.year);
  const options = {
    ...(parts.year && { year: "numeric" }),
    ...(incMonth && { month: "short" }),
    ...(incDate && { day: "numeric" }),
    ...(parts.weekday && { weekday: "short" }),
    ...(parts.time && { hour: "2-digit", minute: "2-digit" }),
  };
  return new Date(date).toLocaleDateString(undefined, options);
}
