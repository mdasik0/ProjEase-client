import PropTypes from "prop-types";
const ReasonsCard = ({
  index = "00",
  description = "No description available",
  children = "N/A",
}) => {
  return (
    <div className="the-card flex items-start gap-1 mb-3 h-[120px] bg-[#1a1a1a] text-white rounded-2xl">
      <div className="front flex items-center gap-6 h-full w-full p-3 rounded-xl overflow-hidden -400">
        <div className="no text-6xl ml-4">{index}</div>
        <div className="w-[2px] h-[70px] bg-gray-500 "></div>

        <div className="title  h-full flex-grow -500 flex justify-between items-center">
          {children}
          <div className="w-[2px] h-[70px] bg-gray-500 mx-4"></div>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  );
};

ReasonsCard.propTypes = {
  index: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReasonsCard;
