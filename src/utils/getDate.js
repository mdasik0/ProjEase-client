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
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  const time = `${hours}:${strMinutes} ${ampm}`;
  return time;
};

const time = getTime();

// Format full date in dd/mm/yyyy
const fullDate = `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${year}`;

const calculateDaysDifference = (givenDate) => {
  const givenDateTime = new Date(givenDate);
  
  const differenceInMs = today.getTime() - givenDateTime.getTime();

  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return differenceInDays;
};

// calculateDaysDifference("dd-mm-yyyy")
// calculateDaysDifference("02-01-2024")

// Export them individually
export { day, date, month, year, monthEng, time, fullDate, calculateDaysDifference };
