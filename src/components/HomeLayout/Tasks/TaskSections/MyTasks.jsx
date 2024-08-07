import { FaChevronDown } from 'react-icons/fa';
import NoTasksCard from "../Cards/NoTasksCard";

const MyTasks = () => {
    return (
      <div className="rounded-xl w-full h-full">
      <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg mr-2">
        <span className="text-lg font-semibold block">My Tasks</span>
        <FaChevronDown />
      </h3>
      <div className="h-[440px] scrollbar overflow-scroll ">
          <NoTasksCard />
      </div>
    </div>
    );
};

export default MyTasks;