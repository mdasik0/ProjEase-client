import PropTypes from "prop-types";
const ReasonsCard = ({
  index = "00",
  description = "No description available",
  children = "N/A",
}) => {
  return (
    <div className="the-card flex  items-center gap-1 mb-3 md:h-[120px] bg-[#1a1a1a] hover:bg-[#0f0f0f] duration-300 text-white rounded-2xl cursor-pointer">
      <div className="front flex flex-col md:flex-row items-center gap-6 h-full w-full p-3 rounded-xl overflow-hidden -400">
        <div className="flex gap-6">
        <div className="no text-6xl ml-4 mt-3">{index}</div>
        <div className="w-[2px] h-[70px] bg-gray-500 "></div>

          {children}
        </div>
          <div className="md:w-[2px] w-full md:h-[70px] h-[2px] bg-gray-500"></div>
        <div className="title w-fit h-full flex-grow -500 flex justify-between items-center">
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
