import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import { BsCalendar2Date } from "react-icons/bs";
import { calculateDaysLeft, formatDate } from "../../../utils/getDate";
import { FiUser, FiUserPlus } from "react-icons/fi";
import StepsSection from "./Cards/StepsSection";
import { useSelector } from "react-redux";
import DeleteTask from "./DeleteTask";

const TaskDetails_SideBar = ({
  isOpen,
  setIsOpen,
  addedBy,
  assignedTo,
  date,
  deadline,
  description,
  priority,
  status,
  steps,
  title,
  _id,
}) => {
  const {members} = useSelector(state => state.projectSlice);

  const assignedToMember = members?.find(member => member?._id === assignedTo)?.name
  const assignedByMember = members?.find(member => member?._id === addedBy)?.name

  // sidebar functio
  // sidebar function

  return (
    <div>
      {/* backdrop */}
      <div className="task-details-backdrop w-screen h-screen absolute top-0 left-0 flex justify-end"></div>
      <div
        
        onClick={(e) => e.stopPropagation()}
        className={`task-details-sidebar bg-white w-[330px] h-screen  duration-500 overflow-y-auto scrollbar-sidebar p-4`}
      >
        {/* close button and time */}
        <div className=" mb-2 flex items-center justify-end">
          <RxCross2
            className=" text-[28px]"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {/* task body */}
        <div className="">
          <p className="text-sm text-gray-500 -mb-1">Title</p>
          <h1 className="text-[25px]">{title}.</h1>
          {/*steps section */}
          <StepsSection steps={steps} _id={_id} />
          {/* description */}
          {description && (
            <>
              <div className="border-r-4 border-red-500 my-6 ">
              <div className="border-r-4 border-red-300 pl-1">
              <p className="text-sm mb-0.5 text-gray-500">Description</p>
              <div className=" text-sm text-black rounded-[7px]">
                {description}
              </div>
              </div>
              </div>
            </>
          )}
          <p
            className={`font-normal text-sm gap-3 ${
              (status === "pending" && "bg-yellow-500") ||
              (status === "in-progress" && "bg-blue-500") ||
              (status === "completed" && "bg-green-500")
            } duration-300 text-white hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4`}
          >
            Status : {status}
          </p>
          <p
            className={`font-normal text-sm gap-3 ${
              (priority === "low" && "bg-green-500") ||
              (priority === "medium" && "bg-yellow-500") ||
              (priority === "high" && "bg-red-500")
            } duration-300 text-white hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4`}
          >
            Priority : {priority}
          </p>

          <div className="font-normal text-sm gap-3 bg-white duration-300 hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4">
            <div className="flex items-center gap-3 mt-1">
              <BsCalendar2Date /> Due {formatDate(deadline)}
            </div>
            <hr className="my-3" />
            <div className="flex items-center gap-3 mb-1">
              <BsCalendar2Date /> {calculateDaysLeft(deadline)}
            </div>
          </div>
          <div className="font-normal text-sm gap-3 bg-white duration-300 hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4">
            <div className="flex items-center gap-3 mt-1">
              <FiUserPlus /> Assigned By { assignedByMember ? assignedByMember?.firstname + " " + assignedByMember?.lastname : 'unknown'}
            </div>
            <hr className="my-3" />
            <div className="flex items-center gap-3 mb-1">
              <FiUser /> Assigned To {assignedToMember ? assignedToMember?.firstname + " " + assignedToMember?.lastname : 'unknown'}
            </div>
          </div>
          <DeleteTask _id={_id} />
          <p className="flex items-center justify-center text-lg  font-normal gap-2  text-gray-500  duration-300  rounded-lg w-full  mb-4">
            Created on
            <span>{formatDate(date)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

TaskDetails_SideBar.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  addedBy: PropTypes.string,
  assignedTo: PropTypes.string,
  date: PropTypes.string,
  deadline: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.string,
  status: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.object),
  time: PropTypes.string,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default TaskDetails_SideBar;
