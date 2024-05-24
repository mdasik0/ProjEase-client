import { date, year, day, monthEng } from "../../../utils/getDate";

const TasksDate = () => {
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
