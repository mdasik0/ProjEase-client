import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoMdStar } from "react-icons/io";
import TaskSideBar from "../TaskSideBar";
import { useUpdateStatusMutation } from "../../../../redux/api/tasksApi";
import toast from "react-hot-toast";
import { fullDate } from "../../../../utils/getDate";

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
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef(null);
  const inputRef = useRef();
  const [updateStatus, { error, isLoading }] = useUpdateStatusMutation();

  const ArrowSvg = (
    <svg
      className="fill-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
    >
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

  const handleStatusUpdate = async (e, id) => {
    e.stopPropagation();
    
    if (status === "completed") {
      toast("Task is already completed", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#ffcd28",
          color: "#ffffff",
        },
      });
      return;
    }

    const statusUpdateResponse = await updateStatus(id);

    if(statusUpdateResponse.data.success) {
      toast.success(statusUpdateResponse.data.message);
    } else {
      toast.error(error.message);
    }
  };

  const completedsteps = steps?.filter((s) => s.isCompleted === true).length;

  return (
    <div
      onClick={() => setIsOpen(true)}
      className={`task_cards ${
        (priority === "low" && "bg-green-200 border-green-300") ||
        (priority === "medium" && "bg-yellow-200 border-yellow-400") ||
        (priority === "high" && "bg-red-200 border-red-300")
      }  pt-3 px-2 border flex flex-col justify-between h-[200px] rounded-xl cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm flex  gap-1">
          <IoMdStar className="text-yellow-500 text-lg" />
          {fullDate === date ? "Today" : date}
        </p>
        {steps?.length != 0 && (
          <span className="text-sm mr-2">
            {steps?.length !== 0 && `${completedsteps} of ${steps?.length}`}
          </span>
        )}
      </div>
      <div className="mt-5 flex-grow">
      <h2 className="text-2xl block pl-2 font-[500]">
      {title?.length > 45 ? title?.substring(0, 50) + " ..." : title}
      </h2>
      </div>
      <div className="ml-2 pb-3 pt-3 flex justify-between items-end">
        <span className="text-sm ">{time}</span>
        <span
          onClick={(e) => handleStatusUpdate(e, _id, status)}
          className="border duration-300 hover:bg-[rgba(0,0,0,0.17)] border-gray-600  p-2 rounded-full mr-2 cursor-pointer"
        >
          {isLoading ? <>
            <span className="loading loading-spinner loading-sm"></span>
          </> : ArrowSvg}
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
