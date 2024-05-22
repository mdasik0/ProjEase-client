import { useEffect, useRef, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const TaskCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const task = "This is the Task Heading And I am Doing this For today";
    const ArrowSvg = <svg
    className=""
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
  </svg>
  
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
      onClick={() => setIsOpen(!isOpen)}
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
      <div
       ref={sidebarRef}
       onClick={(e) => e.stopPropagation()}
        className={`absolute ${
          isOpen ? "right-0 top-0" : "-right-[80%] top-0"
        } bg-gray-200 w-2/12 h-screen duration-500`}
      >
        <div className="p-3 text-2xl">
          <RxCross2 onClick={() => setIsOpen(!isOpen)} />
        </div>
        {/* task body */}
        <div className="mx-4 font-semibold">
            <h1 className="text-xl">{task}.</h1>
            <hr className="my-6 border-gray-500" />
<div>
    
</div>

        </div>
      </div>
    </div>
  );
};

export default TaskCard;
