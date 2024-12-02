import TaskCard from "../Cards/TaskCard";

import PropTypes from "prop-types";
import NoTasksCard from "../Cards/NoTasksCard";
import FailedToLoadDataCard from "../Cards/FailedToLoadDataCard";

const InProgressTasks = ({ inProgressTasks }) => {
  return (
    <div className="rounded-xl w-full h-full">
      <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg mr-6">
        <span className="text-lg font-semibold block">In progress</span>
        <span className="bg-gray-300 px-2 py-0.5 rounded">{inProgressTasks.length}</span>
      </h3>

      <div className="h-[440px] pr-4 scrollbar overflow-scroll ">
        {!inProgressTasks || !Array.isArray(inProgressTasks) ? (
          <FailedToLoadDataCard />
        ) : (
          inProgressTasks.length == 0 && <NoTasksCard />
        )}

        {inProgressTasks?.length != 0 &&
          inProgressTasks?.map((task) => (
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
    </div>
  );
};

InProgressTasks.propTypes = {
  inProgressTasks: PropTypes.arrayOf(
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

export default InProgressTasks;
