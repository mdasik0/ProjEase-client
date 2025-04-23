// dateUtils.js

// Get the current day of the week
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
][new Date().getDay()];

// Get the current date
const today = new Date();
const [date, month, year] = [
  today.getDate(),
  today.getMonth() + 1,
  today.getFullYear(),
];

const monthEng = [
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
][today.getMonth()];

// Function to format time in AM/PM
const getTime = () => {
  let hours = today.getHours();
  const minutes = today.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? "0" + minutes : minutes;
  const time = `${hours}:${strMinutes} ${ampm}`;
  return time;
};

const time = getTime();

// Format full date in dd/mm/yyyy
const fullDate = `${date < 10 ? "0" + date : date}-${
  month < 10 ? "0" + month : month
}-${year}`;

const calculateDaysLeft = (deadline) => {
  const deadlineDate = new Date(deadline.split("-").reverse().join("-"));
  const today = new Date();
  const differenceInMs = deadlineDate - today;
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return differenceInDays > 0
    ? `${differenceInDays} days left`
    : differenceInDays === 0
    ? "Due today"
    : `Overdue by ${Math.abs(differenceInDays)} days`;
};

const dayMonthYear = (date) => {
  let formatted = "";
  if (date) {
    const parsedDate = new Date(date); // use a different name to avoid overwriting the parameter
    if (!isNaN(parsedDate)) {
      formatted = new Intl.DateTimeFormat("en-GB").format(parsedDate);
    }
  }
  return formatted;
};


const formatDate = (anyDate) => {
  const dateArr = anyDate.split("-");
  let dateSmthing;

  if (dateArr[0] == 1) {
    dateSmthing = `${dateArr[0]}st`;
  } else if (dateArr[0] == 2) {
    dateSmthing = `${dateArr[0]}nd`;
  } else if (dateArr[0] == 3) {
    dateSmthing = `${dateArr[0]}rd`;
  } else dateSmthing = `${dateArr[0]}th`;

  const monthIndex = parseInt(dateArr[1], 10) - 1; // Convert to number and adjust for zero-based indexing
  const mE = [
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
  ][monthIndex]; // Access the correct month abbreviation

  const dateStr = `${dateSmthing} of ${mE}, ${dateArr[2]}`;
  return dateStr;
};

// calculateDaysDifference("dd-mm-yyyy")
// calculateDaysDifference("02-01-2024")

// Export them individually
export {
  day,
  date,
  month,
  year,
  monthEng,
  time,
  fullDate,
  calculateDaysLeft,
  formatDate,
  dayMonthYear
};
