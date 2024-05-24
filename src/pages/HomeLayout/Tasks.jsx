import TasksDate from "../../components/HomeLayout/Tasks/TasksDate";
import Sidebar from "../../components/Shared/Sidebar";
import { LuBellRing } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef } from "react";
import AddTask from "../../components/HomeLayout/Tasks/AddTask";
import ToDoTasks from "../../components/HomeLayout/Tasks/ToDoTasks";
import InProgressTasks from "../../components/HomeLayout/Tasks/InProgressTasks";
import CompletedTasks from "../../components/HomeLayout/Tasks/CompletedTasks";
import MyTasks from "../../components/HomeLayout/Tasks/MyTasks";
const Tasks = () => {
  const notifications = ["abdul", "hasem", "rafiq"];

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
    <div className="flex w-full overflow-hidden relative">
      <Sidebar />
      {/* Content here */}
      <div className="w-full">
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

          <div className="border border-gray-400 bg-gray-200 rounded-lg px-3 py-2 flex-grow mx-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-grow">
              <CiSearch className="font-semibold text-xl" />
              <input
                ref={inputRef}
                className="bg-transparent focus:outline-none  flex-grow"
                type="text"
                placeholder="search for anything"
              />
            </div>
            <kbd className="kbd kbd-sm rounded-md py-1">Ctrl + /</kbd>
          </div>

          <div className="border-l pl-6 flex items-center gap-3 w-fit ">
            <button className="flex items-center gap-1 border border-gray-400 hover:bg-gray-200 duration-300 px-3 py-2 rounded-lg">
              <LuSettings2 /> Filter
            </button>
            <AddTask />
          </div>
        </section>
        <section className="mx-5 my-6 h-[512px] flex justify-between items-start bg-gray-100 py-3 px-3 rounded-xl gap-4">
          <ToDoTasks />
          <InProgressTasks />
          <CompletedTasks />
          <MyTasks />
        </section>
      </div>
    </div>
  );
};

export default Tasks;
