import { TiPlus } from "react-icons/ti";
import { useForm } from "react-hook-form";
import Modal from "../../Shared/Modal";
import { useEffect, useState } from "react";
import { MdAddTask, MdCancel } from "react-icons/md";

import { time, fullDate } from "../../../utils/getDate";
import toast from "react-hot-toast";
import { useCreateTaskMutation } from "../../../redux/api/tasksApi";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [createTask, { data, isLoading, isError, error }] =
    useCreateTaskMutation();

  const user = "Md Asik";

  const onCancel = () => {
    reset();
    setIsOpen(false);
  };

  useEffect(() => {
    if (data) {
      toast.success("Task created successfully");
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      const selector = document.getElementById("assignedTo");
      if (selector && selector.options.length > 0) {
        selector.value = selector.options[0].value;
      } // Reset selector to default
      const selector2 = document.getElementById("priority");
      if (selector2 && selector2.options.length > 0) {
        selector2.value = selector2.options[0].value;
      } // Reset selector to default
      document.getElementById("deadline").value = "";
    }
    if (isError) {
      console.error("Error:", error.message);
      toast.error("error.message");
    }
  }, [data, isError, error]);

  const onSubmit = async (taskData) => {
    const taskobj = {
      ...taskData,
      time,
      date: fullDate,
      status: "pending",
      addedBy: user,
      steps: [],
    };
    console.log(JSON.stringify(taskobj));

    createTask(taskobj);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1  bg-zinc-800 hover:bg-zinc-700 duration-300 text-white font-semibold px-5 py-2.5 rounded-lg"
      >
        Create Task <TiPlus />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h1 className="text-2xl font-semibold mb-6">Create Task Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              className="w-full appearance-none rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2 pr-10" // Extra padding for custom arrow
              id="assignedTo"
              {...register("assignedTo")}
            >
              <option value="Mir Hussain">Mir Hussain</option>
              <option value="Mezba Abedin">Mezba Abedin</option>
              <option value="Nahid Hasan">Nahid Hasan</option>
              <option value="Mizanur Rahman">Mizanur Rahman</option>
              <option value="Tanmoy Parvez">Tanmoy Parvez</option>
              <option value="Fahim Ahmed Firoz">Fahim Ahmed Firoz</option>
              <option value="Rahatul Islam">Rahatul Islam</option>
              <option value="Samin Israr Ravi">Samin Israr Ravi</option>
              <option value="Mehedi Anik">Mehedi Anik</option>
              <option value="Ehtisam Haq">Ehtisam Haq</option>
              <option value="Anisur Rahman">Anisur Rahman</option>
              <option value="Muktadir Hasan">Muktadir Hasan</option>
              <option value="Masud Alam">Masud Alam</option>
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
              className="w-full appearance-none rounded-md border border-gray-400 focus:outline-blue-500 px-3 py-2 pr-10" // Extra padding for custom arrow
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
