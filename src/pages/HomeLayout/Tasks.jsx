import TasksDate from "../../components/HomeLayout/Tasks/TasksDate";
import Sidebar from "../../components/Shared/Sidebar";
import { LuBellRing } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef } from "react";
import AddTask from "../../components/HomeLayout/Tasks/AddTask";
import { useGetTasksQuery } from "../../redux/api/tasksApi";
import ToDoTasks from "../../components/HomeLayout/Tasks/TaskSections/ToDoTasks";
import InProgressTasks from "../../components/HomeLayout/Tasks/TaskSections/InProgressTasks";
import CompletedTasks from "../../components/HomeLayout/Tasks/TaskSections/CompletedTasks";
import MyTasks from "../../components/HomeLayout/Tasks/TaskSections/MyTasks";
const Tasks = () => {
  const notifications = ["abdul", "hasem", "rafiq"];

  const { data, isLoading } = useGetTasksQuery();

  const todoTasks = data?.filter(t => t.status === "pending");
  const inProgressTasks = data?.filter(t => t.status === "in-progress");
  const completedTasks = data?.filter(t => t.status === "completed");



  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "/") {
        event.preventDefault();
        inputRef.current.focus();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        inputRef.current.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
      
      <div className="flex-grow">
        <section className="flex justify-between border-b px-10 py-5">
          {/* proj Name */}
          <h1 className="text-3xl font-bold">Project 01</h1>
          {/* icons */}
          <div className="flex gap-6">
            <p className="p-2.5 bg-gray-200 hover:bg-gray-300 cursor-pointer w-fit rounded-full duration-500 relative">
              <LuBellRing className="text-xl" />
              {notifications.length > 0 && (
                <span className="bg-red-500 absolute w-3.5 h-3.5 rounded-full border-2 border-white right-0 top-0"></span>
              )}
            </p>
            <div className="avatar">
              <div className="w-10 rounded-full duration-300 cursor-pointer hover:ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
        </section>
        <section className=" py-3 px-4 my-3.5 border rounded-lg flex items-center justify-between mx-5  ">
          <TasksDate />

          

          <div className="border-l pl-6 flex items-center gap-3 w-fit ">
            
            <AddTask />
          </div>
        </section>
        {isLoading ? (
          <div className="h-3/4 w-full flex items-center justify-center">
            <span className="loading loading-bars loading-lg text-gray-500"></span>
          </div>
        ) : (
          <section className="mx-5 my-6 h-[512px] flex justify-between items-start bg-gray-100 py-3 px-3 rounded-xl gap-4">
            <ToDoTasks todoTasks={todoTasks} />
            <InProgressTasks inProgressTasks={inProgressTasks} />
            <CompletedTasks completedTasks={completedTasks} />
          </section>
        )}
      </div>
  );
};

export default Tasks;
