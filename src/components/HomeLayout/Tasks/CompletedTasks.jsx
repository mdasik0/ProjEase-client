import { FaChevronDown } from "react-icons/fa";
import TaskCard from "./TaskCard";

const CompletedTasks = () => {
  return (
    <div className="rounded-xl w-full">
      <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg">
        <span className="text-lg font-semibold">Completed</span>{" "}
        <FaChevronDown />
      </h3>
      <div>
        <TaskCard />
      </div>
    </div>
  );
};

export default CompletedTasks;
