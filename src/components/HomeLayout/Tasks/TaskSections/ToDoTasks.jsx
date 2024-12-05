import PropTypes from "prop-types";
import TaskCard from "../Cards/TaskCard";
import NoTasksCard from "../Cards/NoTasksCard";
import FailedToLoadDataCard from "../Cards/FailedToLoadDataCard";

const ToDoTasks = ({ todoTasks, noTasks }) => {
  return (
    <div className="rounded-xl w-full h-full">
      <h3 className="flex items-center justify-between py-3 px-3 gap-3 bg-white border border-gray-200 rounded-lg mr-6">
        <span className="text-lg font-[500] block">To do</span>
        <span className="bg-gray-300 px-2 py-0.5 rounded">
          {todoTasks?.length ? todoTasks?.length : "0"}
        </span>
      </h3>
      <div className="h-[440px] pr-4 scrollbar overflow-scroll ">
        {noTasks || todoTasks?.length === 0 ? (
          <NoTasksCard />
        ) : (
          !todoTasks || (!Array.isArray(todoTasks) && <FailedToLoadDataCard />)
        )}

        {todoTasks?.length != 0 &&
          todoTasks?.map((task) => (
            <TaskCard
              key={task?._id}
              _id={task?._id}
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
      <div></div>
    </div>
  );
};

ToDoTasks.propTypes = {
  todoTasks: PropTypes.arrayOf(
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
  ),
  noTasks: PropTypes.bool,
};

export default ToDoTasks;
