import { useEffect, useRef, useState } from "react";
import { IoMdStar } from "react-icons/io";
import TaskSideBar from "./TaskSideBar";

const TaskCard = () => {
  // opens and closes the task sidebar
  const [isOpen, setIsOpen] = useState(false);
  
  const sidebarRef = useRef(null);
  const inputRef = useRef();

// dummy data
  const task = "This is the Task Heading And I am Doing this For today";

  const ArrowSvg = (
    <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
    </svg>
  );

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="task_cards bg-red-100 mt-3 pt-3 px-2 rounded-xl cursor-pointer"
    >
      <p className="text-sm flex gap-1">
        <IoMdStar className="text-yellow-500 text-lg" />
        today{" "}
      </p>
      <h2 className="text-2xl mt-5 block pl-2 font-semibold">
        {task.length > 45 ? task.substring(0, 45) + " ..." : task}
      </h2>
      <div className="ml-2 pb-3 pt-3 flex justify-between items-end">
        <span className="text-sm ">09:05 pm</span>
        <span className="border duration-300 hover:bg-red-300 border-black p-2 rounded-full mr-2 cursor-pointer">
          {ArrowSvg}
        </span>
      </div>
      {/* sidebar */}
      <TaskSideBar task={task} isOpen={isOpen} setIsOpen={setIsOpen} sidebarRef={sidebarRef} inputRef={inputRef} />
    </div>
  );
};

export default TaskCard;