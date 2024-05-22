import TasksDate from "../../components/HomeLayout/Tasks/TasksDate";
import Sidebar from "../../components/Shared/Sidebar";
import { LuBellRing } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef } from "react";
import { FaCaretRight, FaChevronDown } from "react-icons/fa";
import TaskCard from "../../components/HomeLayout/Tasks/TaskCard";
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
    <div className="flex w-full ">
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
            <button className="flex items-center gap-1  bg-zinc-800 hover:bg-zinc-900 duration-300 text-white font-semibold px-6 py-3 rounded-lg">
              Create Task <TiPlus />
            </button>
          </div>
        </section>
        <section className="mx-5 my-6 flex justify-between items-start bg-gray-100 py-3 px-3 rounded-xl gap-10">
          <div className=" rounded-xl w-full">
            <h3 className="flex items-center justify-between py-2 px-3 gap-3 bg-white rounded-lg">
              <span className="text-lg font-semibold">To Do</span> <FaChevronDown />
            </h3>
            <div>
              <TaskCard />
            </div>
          </div>
          <div className="border-2 rounded-xl w-full">
            <h3 className="flex items-center py-1 px-3 gap-3 bg-gray-50">
              <FaCaretRight /> <span className="text-xl font-semibold">To Do</span>
            </h3>
            <div>
              <div className="task_cards m-3">

              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl w-full">
            <h3 className="flex items-center py-1 px-3 gap-3 bg-gray-50">
              <FaCaretRight /> <span className="text-xl font-semibold">To Do</span>
            </h3>
            <div>
              <div className="task_cards m-3">

              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl w-full">
            <h3 className="flex items-center py-1 px-3 gap-3 bg-gray-50">
              <FaCaretRight /> <span className="text-xl font-semibold">To Do</span>
            </h3>
            <div>
              <div className="task_cards m-3">

              </div>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  );
};

export default Tasks;
