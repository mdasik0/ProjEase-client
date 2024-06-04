import { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import StepsCard from "./StepsCard";
import { IoIosAttach } from "react-icons/io";
import { LuPlusSquare } from "react-icons/lu";
import { IoTrashSharp } from "react-icons/io5";
import { useDeleteTaskMutation } from "../../../redux/api/tasksApi";
import Modal from "../../Shared/Modal";
import toast from "react-hot-toast";
import { BsCalendar2Date } from "react-icons/bs";
import { calculateDaysDifference } from "../../../utils/getDate";
import { FiUser, FiUserPlus } from "react-icons/fi";

const TaskSideBar = ({
  sidebarRef,
  inputRef,
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
  time,
  title,
  _id,
}) => {
  const [addStepsInfo, setAddStepsInfo] = useState({
    inputHover: false,
    onchangeStpes: "",
  });
  const [stepsData, setStepsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTask, { data }] = useDeleteTaskMutation();

  // sidebar function
  const inputFocus = (e) => {
    e.stopPropagation();
    inputRef.current.focus();
  };

  // sidebar function
  const handleAddSteps = (e) => {
    e.preventDefault();
    setStepsData([
      ...stepsData,
      { id: stepsData.length + 1, step: addStepsInfo.onchangeStpes },
    ]);
    document.getElementById("addSteps").value = "";
    setAddStepsInfo({ ...addStepsInfo, onchangeStpes: "" });
  };

  const handleDeleteTasks = (_id) => {
    deleteTask(_id);
    setIsModalOpen(false);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
    }
  }, []);

  return (
    <div
      ref={sidebarRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${
        isOpen ? "right-0 top-0" : "-right-[80%] top-0"
      } bg-gray-200 w-[280px] h-screen  duration-500`}
    >
      <div className="p-3 flex items-center justify-between">
        <span className="text-sm pl-2 text-gray-500">{time}</span>
        <RxCross2 className=" text-2xl" onClick={() => setIsOpen(!isOpen)} />
      </div>
      {/* task body */}
      <div className="mx-4 font-semibold">
        <h1 className="text-xl">{title}.</h1>
        <hr className="mt-6 border-gray-500" />
        {/* add steps section */}
        <section className="mt-3">
          {/* card start */}
          {stepsData.map((d) => (
            <StepsCard
              key={d.id}
              d={d}
              steps={addStepsInfo}
              setSteps={setAddStepsInfo}
            />
          ))}
          {/* card end */}
          <div
            onClick={inputFocus}
            className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg"
          >
            {addStepsInfo.onchangeStpes ? (
              <FaRegCircle onClick={handleAddSteps} />
            ) : (
              <LuPlusSquare />
            )}

            <input
              ref={inputRef}
              id="addSteps"
              onChange={(e) =>
                setAddStepsInfo({
                  ...addStepsInfo,
                  onchangeStpes: e.target.value,
                })
              }
              className="font-normal bg-transparent placeholder:text-black placeholder:focus:text-gray-400 placeholder:text-sm focus:outline-none focus:border-b border-gray-500 hover:cursor-pointer"
              type="text"
              placeholder="Add Steps"
            />
          </div>
        </section>
        <div className="flex items-center gap-3 bg-white duration-300 hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4">
          <IoIosAttach /> <span className="font-normal text-sm">Add files</span>
        </div>
        <p className="font-normal text-sm gap-3 bg-white duration-300 hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4">
          <span className="block font-semibold text-gray-500 mb-2">
            Description
          </span>
          {description}
        </p>
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
            <BsCalendar2Date /> Due {deadline}
          </div>
          <hr className="my-3" />
          <div className="flex items-center gap-3 mb-1">
            <BsCalendar2Date /> {calculateDaysDifference()} days left
          </div>
        </div>
        <div className="font-normal text-sm gap-3 bg-white duration-300 hover:bg-gray-100 rounded-lg px-3 py-2.5 mt-4">
          <div className="flex items-center gap-3 mt-1">
          <FiUserPlus /> Assigned By {addedBy}
          </div>
          <hr className="my-3" />
          <div className="flex items-center gap-3 mb-1">
          <FiUser /> Assigned To {assignedTo}
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-red-500 text-white duration-300 hover:bg-red-400 font-semibold rounded-lg px-3 py-2.5 mt-4 w-full"
        >
          <IoTrashSharp />{" "}
          <span className="font-normal text-sm">Delete task</span>
        </button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <div>
            <h2 className="text-xl text-center my-4">
              Do you Want to Delete This Task ?
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteTasks(_id)}
                className="flex items-center justify-center gap-3 bg-red-500 text-white duration-300 hover:bg-red-400 font-semibold rounded-lg px-3 py-2.5 mt-4 w-full"
              >
                <IoTrashSharp /> Delete
              </button>
              <button
                onClick={(e) => closeModal(e)}
                className="flex items-center justify-center gap-2 bg-green-500 text-white duration-300 hover:bg-green-400 font-semibold rounded-lg px-3 py-2.5 mt-4 w-full"
              >
                <RxCross2 /> Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

TaskSideBar.propTypes = {
  sidebarRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
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

export default TaskSideBar;
