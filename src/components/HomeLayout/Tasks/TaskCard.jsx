import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoMdStar } from "react-icons/io";
import TaskSideBar from "./TaskSideBar";

const TaskCard = ({
  addedBy,
  assignedTo,
  date,
  deadline,
  description,
  priority,
  status,
  steps,
  time,
  title,
  _id,
}) => {
  // Log task to verify prop is being passed correctly
  // opens and closes the task sidebar
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef(null);
  const inputRef = useRef();

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

  const handleStatusUpdate = (e, id) => {
    e.stopPropagation();
    console.log(id);
  };

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="task_cards bg-red-100 mt-3 pt-3 px-2 flex flex-col justify-between min-h-[174px] rounded-xl cursor-pointer"
    >
      <p className="text-sm flex gap-1">
        <IoMdStar className="text-yellow-500 text-lg" />
        {date || "No Date"}
      </p>
      <h2 className="text-2xl mt-5 block pl-2 font-semibold">
        {title?.length > 45
          ? title?.substring(0, 45) + " ..."
          : title || "No Title"}
      </h2>
      <div className="ml-2 pb-3 pt-3 flex justify-between items-end">
        <span className="text-sm ">{time || "No Time"}</span>
        <span
          onClick={(e) => handleStatusUpdate(e,_id)}
          className="border duration-300 hover:bg-red-300 border-black p-2 rounded-full mr-2 cursor-pointer"
        >
          {ArrowSvg}
        </span>
      </div>
      {/* sidebar */}
      <TaskSideBar
        _id={_id}
        title={title}
        description={description}
        addedBy={addedBy}
        assignedTo={assignedTo}
        date={date}
        time={time}
        deadline={deadline}
        priority={priority}
        steps={steps}
        status={status}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sidebarRef={sidebarRef}
        inputRef={inputRef}
      />
    </div>
  );
};

TaskCard.propTypes = {
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
};

export default TaskCard;
