import PropTypes from "prop-types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCompleteStepsMutation, useDeleteStepsMutation } from "../../../../redux/api/tasksApi";
import { TiTick, TiTimes } from "react-icons/ti";

const StepsCard = ({ _id, step }) => {
  const [completeSteps,{data : completeStep}] = useCompleteStepsMutation();
  const [deleteSteps,{data: deleteStep}] = useDeleteStepsMutation();
  const handleCompleteStep = (stepid) => {
    const obj = {
      _id,
      stepid
    }
    completeSteps(obj);
  };
  const handleDeleteStep = (stepid) => {
    const obj = {
      _id,
      stepid
    }
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
    <div className="step-card flex items-center justify-between bg-white ps-2 pe-1 py-1.5 rounded-[6px]">
                <p className={`step-title text-sm ${step?.isCompleted && 'line-through'}`}>{step?.text}</p>
                 <div className="flex">
                 {!step?.isCompleted &&<TiTick onClick={() => handleCompleteStep(step?._id)} className="text-xl text-green-500" />}
                <TiTimes onClick={() => handleDeleteStep(step?._id)} className="text-xl text-red-500" />
                </div>

              </div>
  );
};

// PropTypes validation
StepsCard.propTypes = {
  _id: PropTypes.string,
  step: PropTypes.shape({
    isCompleted: PropTypes.bool,
    text: PropTypes.string,
    _id: PropTypes.any,
  }).isRequired,
};

export default StepsCard;
