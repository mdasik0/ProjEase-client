import TasksDate from "../../components/HomeLayout/Tasks/TasksDate";
import Sidebar from "../../components/Shared/Sidebar";
import { LuBellRing } from "react-icons/lu";
const Tasks = () => {
    const notifications = ["abdul", "hasem", "rafiq"]
  return (
    <div className="flex w-full">
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
              {
                notifications.length > 0 && <span className="bg-red-500 absolute w-3.5 h-3.5 rounded-full border-2 border-white right-0 top-0"></span>
              }
            </p>
            <div className="avatar">
              <div className="w-10 rounded-full duration-300 cursor-pointer hover:ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
        </section>
        <section className="mx-8 py-3 px-6 my-3.5 border rounded-lg flex items-center justify-between">
            <TasksDate />
            
        </section>
      </div>
    </div>
  );
};

export default Tasks;
