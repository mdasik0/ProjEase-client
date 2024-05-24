import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

const StepsCard = ({ d }) => {
    const [stepHover, setStepHover] = useState(false)
    const handleUpdateSteps = (_id) => {
        console.log('updated status', _id)
    }
  return (
    <div className="flex items-center gap-2 rounded-lg mb-2">
      <div
        onMouseEnter={() => setStepHover(true)}
        onMouseLeave={() => setStepHover(false)}
      >
        {stepHover ? <FaRegCheckCircle onClick={() => handleUpdateSteps(d.id)} /> : <FaRegCircle />}
      </div>

      <h4 className="font-normal bg-transparent placeholder:text-black placeholder:focus:text-gray-400 placeholder:text-sm focus:outline-none focus:border-b border-gray-500 hover:cursor-pointer">
        {d.step} 
      </h4>
    </div>
  );
};

// PropTypes validation
StepsCard.propTypes = {
  d: PropTypes.shape({
    step: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default StepsCard;
