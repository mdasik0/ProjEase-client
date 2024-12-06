import { useSelector } from "react-redux";
import { useGetAllTasksQuery } from "../../redux/api/tasksApi";
import TaskCard from "../../components/HomeLayout/Tasks/Cards/TaskCard";
import { IoWarning } from "react-icons/io5";

const MyTasks = () => {
  const { userData } = useSelector((state) => state.userSlice);
  const { tasksInitial } = useSelector((state) => state.tasksSlice);
  const { data: allTasks, isLoading } = useGetAllTasksQuery(
    tasksInitial?.allTasks,
    {
      skip: tasksInitial?.allTasks?.length === 0,
    }
  );

  const myTasks = allTasks?.filter((t) => t.assignedTo === userData?._id);

  return (
    <div className="w-screen h-screen p-12 flex flex-col">
      <div className="border border-gray-300 bg-gray-100 w-full p-6 rounded-xl">
        <h1 className="text-3xl font-[500] text-black mb-3">My Tasks </h1>
        <p>Welcome to my tasks. Any tasks assigned to you will show up here.</p>
      </div>

      <div className="border border-gray-300 bg-gray-100 w-full p-6 rounded-xl mt-10 flex-grow ">
        {
            isLoading && <div className="w-full h-full flex items-center justify-center"> 
            <span className="loading loading-bars loading-lg text-gray-800"></span>

            </div>
        }
        {myTasks?.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-6 w-full h-full">
            <IoWarning className="text-[#727272] text-[80px]" />
            <h1 className="text-[#727272] text-4xl">No Tasks Available</h1>
            <p>No Tasks was assigned to you. You can assign tasks from create task {'>'} assignTo dropdown menu. </p>
          </div>
        )}
        <div className="grid grid-cols-3">
          {myTasks?.map((task) => (
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

export default MyTasks;
