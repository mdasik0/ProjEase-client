import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCompleteStepsMutation, useDeleteStepsMutation } from "../../../redux/api/tasksApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const StepsCard = ({ d, _id }) => {
  const [completeSteps,{data : completeStep}] = useCompleteStepsMutation();
  const [deleteSteps,{data: deleteStep}] = useDeleteStepsMutation();
  const handleUpdateSteps = (stepid) => {
    const obj = {
      _id,
      stepid
    }
    console.log(obj)
    completeSteps(obj);
  };
  const handleDeleteStep = (stepid) => {
    const obj = {
      _id,
      stepid
    }
    console.log(obj)
    deleteSteps(obj);
  };

  useEffect(() => {
    if (completeStep) {
      toast.success(completeStep.message);
    }
    if (deleteStep) {
      toast.success(deleteStep.message);
    }
    
  }, [completeStep, deleteStep]);
  
  return (
    <div className="flex items-center gap-2 justify-between mx-2 mb-2">
      <div className="flex items-center gap-2">
      <div>
        {d.isCompleted && <FaRegCheckCircle />}
        {!d.isCompleted && (
          <FaRegCircle onClick={() => handleUpdateSteps(d._id)} />
        )}
      </div>
      <h4 title={d?.text} className={`font-normal ${d.isCompleted ? "text-gray-500 line-through" : "text-black"}`}>
        {d?.text.length > 20 ? d?.text.substring(0, 20) + '...' : d?.text}
      </h4>
      </div>
      <RxCross2 onClick={() => handleDeleteStep(d._id)} title="delete step" className="text-lg text-red-500" />
    </div>
  );
};

// PropTypes validation
StepsCard.propTypes = {
  _id: PropTypes.string,
  d: PropTypes.shape({
    isCompleted: PropTypes.bool,
    text: PropTypes.string,
    _id: PropTypes.any,
  }).isRequired,
};

export default StepsCard;
