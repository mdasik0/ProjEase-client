import { useSelector } from "react-redux";
import { useGetAllTasksQuery } from "../../redux/api/tasksApi";
import TaskCard from "../../components/HomeLayout/Tasks/Cards/TaskCard";
import { IoWarning } from "react-icons/io5";

const OverdueTasks = () => {
  const { tasksInitial } = useSelector((state) => state.tasksSlice);
  const { data: allTasks, isLoading } = useGetAllTasksQuery(
    tasksInitial?.allTasks,
    {
      skip: tasksInitial?.allTasks?.length === 0,
    }
  );

  const overdueTasks = allTasks?.filter((t) => {
    const deadlineDate = new Date(t.deadline);
    const currentDate = new Date();

    // Adjust both dates to midnight in Bangladesh time
    const bdOffset = 6 * 60 * 60 * 1000; // UTC+6 offset in milliseconds

    // Reset to midnight and adjust for Bangladesh timezone
    const deadlineMidnight = new Date(deadlineDate.getTime() + bdOffset);
    deadlineMidnight.setHours(0, 0, 0, 0);

    // Set current date to midnight in Bangladesh time
    const currentMidnight = new Date(currentDate.getTime() + bdOffset);
    currentMidnight.setHours(0, 0, 0, 0);

    // Check if the task deadline is strictly before today's date
    return deadlineMidnight < currentMidnight;
});
console.log(overdueTasks);
  return (
    <div className="w-screen h-screen p-12 flex-grow flex flex-col">
      <div className="border border-gray-300 bg-gray-100 w-full p-6 rounded-xl">
        <h1 className="text-3xl font-[500] text-black mb-3">Overdue Tasks </h1>
        <p>Welcome to overdue tasks. Any tasks that&apos;s past its due date will show up here.</p>
      </div>

      <div className="border border-gray-300 bg-gray-100 w-full p-6 rounded-xl mt-10 flex-grow ">
        {
            isLoading && <div className="w-full h-full flex items-center justify-center"> 
            <span className="loading loading-bars loading-lg text-gray-800"></span>

            </div>
        }
        {overdueTasks?.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-6 w-full h-full">
            <IoWarning className="text-[#727272] text-[80px]" />
            <h1 className="text-[#727272] text-4xl">No Tasks Available</h1>
            <p>No overdue tasks are avilable. add due date to your tasks.</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-5">
          {overdueTasks?.map((task) => (
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
    </div>
  );
};

export default OverdueTasks;
