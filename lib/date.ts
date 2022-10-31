export function convertDateFormat(date: string) {
  const dateArr = date.split("-");
  let monthNum: number;
  dateArr[1][0] === "0"
    ? (monthNum = +dateArr[1][1])
    : (monthNum = +dateArr[1]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[monthNum - 1]} ${dateArr[2]}, ${dateArr[0]}`;
}
