import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import StepsCard from "./StepsCard";
import { useState } from "react";
import { useAddStepsMutation } from "../../../../redux/api/tasksApi";
import toast from "react-hot-toast";

const StepsSection = ({ steps, _id }) => {
  const [inputData, setInputData] = useState("");

  const [addSteps, { error }] = useAddStepsMutation();

  const handleAddSteps = (e, _id) => {
    e.preventDefault();
    const stepsData = {
      text: inputData,
      isCompleted: false,
    };
    try {
      if (steps.length >= 5) {
        return toast.error("you can't add more than 5 steps in a Task");
      } else {
        const addstepRes = addSteps({ _id, body: stepsData });
        if (addstepRes) {
          toast.success("new step added successfully");
        }
      }
    } catch (e) {
      toast.error(error.message);
      console.error(e.message);
    }

    document.getElementById("addSteps").value = "";
    setInputData("");
  };

  return (
    <section className="mt-3 bg-gray-200 rounded-lg">
      {/* steps shown here */}
      <div className={`steps-container flex flex-col gap-2 ${steps?.length === 0 ? "" : "p-1.5"}`}>
        {steps?.map((step) => (
          <StepsCard _id={_id} step={step} key={step?._id} />
        ))}
      </div>

      <form
        onSubmit={(e) => handleAddSteps(e, _id)}
        className="flex items-center gap-1 p-1 rounded-lg"
      >
        <input
          id="addSteps"
          required
          onChange={(e) => setInputData(e.target.value)}
          className="border-[1px] flex-grow focus:outline-none py-1 px-2  rounded-[7px]"
          placeholder="Add step"
          type="text"
        />
        <button type="submit" className="bg-white p-[6px] rounded-md">
          <FaPlus className="text-xl text-green-500" />
        </button>
      </form>
    </section>
  );
};

StepsSection.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // or PropTypes.number, depending on your data
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  _id: PropTypes.string.isRequired,
};

export default StepsSection;
