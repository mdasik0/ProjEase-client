import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { IoMdStar } from "react-icons/io";
import TaskDetails_SideBar from "../TaskDetails_SideBar";
import { useUpdateStatusMutation } from "../../../../redux/api/tasksApi";
import toast from "react-hot-toast";
import { fullDate } from "../../../../utils/getDate";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
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
  // State to track if the sidebar is open
  const [isOpen, setIsOpen] = useState(false);

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
  // References for sidebar and input elements
  const inputRef = useRef();

  // Mutation hook for updating task status
  const [updateStatus, { error, isLoading }] = useUpdateStatusMutation();

  // Function to handle the status update of the task
  const handleStatusUpdate = async (e, id) => {
    e.stopPropagation(); // Prevent event propagation to parent elements

    // If task is already completed, show a toast notification
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

    // Perform the status update mutation
    const statusUpdateResponse = await updateStatus(id);

    // Display appropriate toast message based on mutation result
    if (statusUpdateResponse.data.success) {
      toast.success(statusUpdateResponse.data.message);
    } else {
      toast.error(error.message); // Show error message if status update fails
    }
  };

  // Calculate the number of completed steps
  const completedsteps = steps?.filter((s) => s.isCompleted === true).length;

  return (
    <div
      onClick={() => setIsOpen(true)} // Open the sidebar on div click
      className={`task_cards ${
        (priority === "low" && "bg-green-200 border-green-300") ||
        (priority === "medium" && "bg-yellow-200 border-yellow-400") ||
        (priority === "high" && "bg-red-200 border-red-300")
      } border rounded-xl cursor-pointer p-4 h-[200px] w-[400px]`}
    >
      {/* Date and steps info */}
      <div className="flex items-center justify-between">
        <p className="text-sm flex gap-1">
          {fullDate === date ? (
            <span className="flex gap-1">
              <IoMdStar className="text-yellow-500 text-lg" />
              Today
            </span>
          ) : (
            date
          )}
        </p>
        {steps?.length !== 0 && (
          <span className="text-sm mr-2">
            {completedsteps} of {steps?.length} steps completed
          </span>
        )}
      </div>

      {/* Task title */}
      <div className="h-[105px] py-0.5 flex-grow overflow-hidden">
        <h2 className="text-[22px] leading-[30px]">
          {title?.length > 80 ? title?.substring(0, 80) + " ..." : title}
        </h2>
      </div>

      {/* Task time and status update icon */}
      <div className="flex justify-between items-end">
        <span className="text-sm ">{time}</span>
        {status === "completed" ? (
          <div className="tooltip" data-tip="Task Complete">
            <IoCheckmarkDoneCircle className="text-[54px] -mb-3" />
          </div>
        ) : (
          <span
            onClick={(e) => handleStatusUpdate(e, _id)} // Handle status update on icon click
            className="border duration-300 hover:bg-[rgba(0,0,0,0.17)] border-gray-600 rounded-full cursor-pointer p-2"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span> // Show loading spinner when loading
            ) : (
              ArrowSvg
            )}
          </span>
        )}
      </div>

      {/* Sidebar component (only shown when the sidebar is open) */}
      {isOpen && (
        <TaskDetails_SideBar
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
          inputRef={inputRef}
        />
      )}
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
