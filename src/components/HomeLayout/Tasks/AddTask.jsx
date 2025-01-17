import { TiPlus } from "react-icons/ti";
import { useForm } from "react-hook-form";
import Modal from "../../Shared/Modal";
import { useEffect, useMemo, useState } from "react";
import { MdAddTask, MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import { time, fullDate } from "../../../utils/getDate";
import { useCreateTaskMutation } from "../../../redux/api/tasksApi";
import { useDispatch, useSelector } from "react-redux";
import { useGetMultiUserQuery } from "../../../redux/api/userApi";
import { storeMembersInfo } from "../../../redux/features/projectSlice";

const AddTask = () => {
  // modal
  const [isOpen, setIsOpen] = useState(false);
  //form
  const { register, handleSubmit, reset } = useForm();
  //task creator //TODO:: DATA REMOVED
  const [createTask, { isLoading, isError, error }] = useCreateTaskMutation();
  // using taskinitial id to store it in all tasks
  const { tasksInitial } = useSelector((state) => state.tasksSlice);

  // setting up the date for deadline input
  const today = new Date().toISOString().split("T")[0];

  // added by the current user
  const { userData } = useSelector((state) => state.userSlice);
  const currUserId = userData?._id;

  // setting up all members for input assignedTo
  const { projectData } = useSelector((state) => state.projectSlice);

  const membersIDs = useMemo(() => {
    return projectData?.members?.map((m) => m.userId);
  }, [projectData]);
  
  const { data: allMembers } = useGetMultiUserQuery(membersIDs, {
    skip: !membersIDs,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (allMembers) {
      dispatch(storeMembersInfo(allMembers));
    }
  }, [allMembers]);

  // cancel button func
  const onCancel = () => {
    reset();
    setIsOpen(false);
  };

  // Function to reset the form and modal
  const resetForm = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    const selector = document.getElementById("assignedTo");
    if (selector && selector.options.length > 0) {
      selector.value = selector.options[0].value;
    }

    const selector2 = document.getElementById("priority");
    if (selector2 && selector2.options.length > 0) {
      selector2.value = selector2.options[0].value;
    }

    document.getElementById("deadline").value = new Date()
      .toISOString()
      .split("T")[0];

    setIsOpen(false);
  };

  // useEffect now just handles the `isError` check
  useEffect(() => {
    if (isError) {
      console.error("Error:", error?.message);
      toast.error(error?.message || "Something went wrong.");
    }
  }, [isError, error]);

  const onSubmit = async (taskData) => {
    const formatedDeadline = taskData.deadline.split("-").reverse().join("-");
    const taskobj = {
      ...taskData,
      status: "pending",
      addedBy: currUserId,
      steps: [],
      time: time,
      date: fullDate,
      deadline: formatedDeadline,
    };

    try {
      const taskCreationResponse = await createTask({
        _id: tasksInitial?._id,
        taskobj,
      }).unwrap();
      if (taskCreationResponse.success === true) {
        toast.success(taskCreationResponse.message);
        resetForm();
      } else {
        toast.error(error?.message);
      }
    } catch (error) {
      console.error("Task creation error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 duration-300 text-white font-semibold px-5 py-2.5 rounded-lg"
      >
        Add Task <TiPlus />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold mb-6">Add Task Form</h1>
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="title"
              className="mb-2 text-xs bg-white text-gray-500 px-2 w-fit absolute -top-[16%] left-[2%]"
            >
              Title
            </label>
            <input
              placeholder="Enter Task Title"
              required
              className="w-full rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2"
              type="text"
              id="title"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="description"
              className="mb-2 text-xs bg-white text-gray-500 px-2 w-fit absolute -top-[16%] left-[2%]"
            >
              Description
            </label>
            <textarea
              placeholder="Enter Task Description"
              className="w-full rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2"
              type="text"
              id="description"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="deadline"
              className="mb-2 text-xs bg-white text-gray-500 px-2 w-fit absolute -top-[16%] left-[2%]"
            >
              Deadline
            </label>
            <input
              className="w-full rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2"
              type="date"
              id="deadline"
              min={today} // Set the minimum date to today's date
              defaultValue={today} // Set the default date to today's date
              {...register("deadline")}
            />
          </div>
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="assignedTo"
              className="mb-2 text-xs bg-white text-gray-500 px-2 w-fit absolute -top-[16%] left-[2%]"
            >
              Assigned To
            </label>
            <select
              required
              className="w-full appearance-none rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2 pr-10"
              id="assignedTo"
              {...register("assignedTo")}
            >
              {allMembers?.map((m) => (
                <option key={m._id} value={m?._id}>
                  {" "}
                  {m?.name?.firstname + " " + m?.name?.lastname}{" "}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col mb-5 relative">
            <label
              htmlFor="priority"
              className="mb-2 text-xs bg-white text-gray-500 px-2 w-fit absolute -top-[16%] left-[2%]"
            >
              Priority
            </label>
            <select
              className="w-full appearance-none rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2 pr-10"
              id="priority"
              {...register("priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option defaultValue value="high">
                High
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => onCancel()}
              type="button"
              className="text-sm bg-red-500 text-white px-4 h-fit py-3 rounded-lg flex items-center gap-2"
            >
              <MdCancel className="text-xl" />
              Cancel
            </button>
            <button
              type="submit"
              className=" flex items-center gap-2 text-sm bg-green-500 text-white px-4 h-fit py-3 rounded-lg"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <>
                  <MdAddTask className="text-xl" />
                  <span> Create task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
