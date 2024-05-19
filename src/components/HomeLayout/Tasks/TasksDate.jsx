const TasksDate = () => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];

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
  ][month];
//   console.log(`date: ${date}, Month: ${month}, Year: ${year}`);

  return (
    <div className="border-r pl-2 pr-6 w-fit ">
      <h2 className="text-2xl">{day}</h2>
      <h className="font-semibold">
        {date} of {monthEng}, {year}
      </h>
    </div>
  );
};

export default TasksDate;
