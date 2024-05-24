import { FaChevronDown } from "react-icons/fa";
import TaskCard from "./TaskCard";

const InProgressTasks = () => {
    return (
      <div className="rounded-xl w-full h-full">
      <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg mr-6">
        <span className="text-lg font-semibold block">In progress</span>
        <FaChevronDown />
      </h3>
      <div className="h-[440px] pr-4 scrollbar overflow-scroll ">
        <TaskCard />
      </div>
    </div>
    );
};

export default InProgressTasks;