import { FaChevronDown } from "react-icons/fa";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";


const CompletedTasks = ({completedTasks}) => {
  return (
    <div className="rounded-xl w-full h-full">
      <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg mr-6">
        <span className="text-lg font-semibold block">Completed</span>
        <FaChevronDown />
      </h3>
      <div className="h-[440px] pr-4 scrollbar overflow-scroll ">
      {completedTasks?.map((task) => (
          <TaskCard
            key={task?._id}
            _id= {task?._id}
            status={task?.status}
            title={task?.title}
            description={task?.description}
            addedBy={task?.addedBy}
            assignedTo={task?.assignedTo}
            date={task?.date}
            time={task?.time}
            deadline={task?.deadline}
            priority={task?.priority}
            steps={task?.steps}

          />
        ))}
      </div>
    </div>
  );
};

CompletedTasks.propTypes = {
  completedTasks: PropTypes.arrayOf(
    PropTypes.shape({
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
      steps: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
};

export default CompletedTasks;
