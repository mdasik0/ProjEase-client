import { FaChevronDown } from "react-icons/fa";
import PropTypes from 'prop-types';
import TaskCard from "./TaskCard";

const ToDoTasks = ({todoTasks}) => {
  return (
    <div className="rounded-xl w-full h-full">
      <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg mr-6">
        <span className="text-lg font-semibold block">To Do</span>
        <FaChevronDown />
      </h3>
      <div className="h-[440px] pr-4 scrollbar overflow-scroll ">
        {
          todoTasks.map(task => <TaskCard key={task._id} task={task} />)
        }
      </div>
    </div>
  );
};

ToDoTasks.propTypes = {
  todoTasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    deadline: PropTypes.string,
    assignedTo: PropTypes.string,
    priority: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
    addedBy: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.object)
  })).isRequired
};

export default ToDoTasks;

