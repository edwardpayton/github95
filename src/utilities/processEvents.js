const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function (events) {
  // convert events to an array
  const eventArray = Array.from(Object.keys(events), (k) => events[k]);
  // group events by date and add to a new object
  const dateGrouped = eventArray.reduce((obj, event) => {
    const createdDate = event.created_at.split("-");
    const monthNum = createdDate[1].replace(/^0+/, "");
    obj[monthNum]
      ? obj[monthNum].data.push(event)
      : (obj[monthNum] = {
          key: monthNames[monthNum - 1],
          date: `${monthNames[monthNum - 1]} ${createdDate[0]}`,
          data: [event],
        });
    return obj;
  }, {});
  // loop grouped obj (backwards) and add to new array
  let i = 12;
  const orderedEvents = [];
  while (i > 0) {
    dateGrouped[i] !== undefined && orderedEvents.push(dateGrouped[i]);
    i--;
  }
  // events array now grouped by month, ordered desc by date
  // TODO - if missing month (eg no events in that month), add empty row OR prevMonth entry
  return orderedEvents;
}
