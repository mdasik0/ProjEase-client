import { TiPlus } from "react-icons/ti";
import { useForm } from "react-hook-form";
import Modal from "../../Shared/Modal";
import { useState } from "react";

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onCancel = () => {
    reset();
    setIsOpen(false);
  };
  const onSubmit = (data) => {
    console.log(data)
  };
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1  bg-zinc-800 hover:bg-zinc-700 duration-300 text-white font-semibold px-5 py-2.5 rounded-lg">
        Create Task <TiPlus />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Programming Hero">
        <form onSubmit={handleSubmit(onSubmit)}>
         add title input here
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Description
            </label>
            <textarea
              className="w-full rounded-md"
              type="text"
              id="description"
              {...register("description")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Deadline
            </label>
            <input
              className="w-full rounded-md"
              type="date"
              id="date"
              {...register("date")}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Assign to
            </label>
            <select
              className="w-full rounded-md"
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
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="title" className="mb-2">
              Priority
            </label>
            <select
              className="w-full rounded-md"
              id="priority"
              {...register("priority")}
            >
              <option defaultValue value="high">
                High
              </option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => onCancel()}
              type="button"
              className="btn btn-danger "
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary ">
              submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
