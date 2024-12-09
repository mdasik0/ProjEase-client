import { date, year, day, monthEng } from "../../../utils/getDate";

const TasksDate = () => {
  return (
    <div className="border-r pl-2 pr-6 w-fit ">
      <h2 className="text-2xl">{day}</h2>
      <h1 className="font-semibold">
        {date} {monthEng}, {year}
      </h1>
    </div>
  );
};

export default TasksDate;
