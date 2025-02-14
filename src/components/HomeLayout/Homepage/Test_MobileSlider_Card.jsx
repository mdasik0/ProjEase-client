import PropTypes from "prop-types";
import { TiStarFullOutline } from "react-icons/ti";
import { BiSolidQuoteRight } from "react-icons/bi";
const Test_MobileSlider_Card = ({ children,imgIndex,ratingValue,userName,position,comment }) => {
  return (
    <div style={{
        transform: `translateX(-${imgIndex * 100}%)`,
      }} className="h-[273px] flex flex-col justify-end transition-transform duration-500">
      <div className="test-mobile-slider-card h-[250px] min-w-[360px] rounded-2xl border border-gray-300    shadow-[0px_0px_3px_3px_rgba(0,0,0,0.05)] p-4">
        <div className="flex gap-3">
          <div className="test-mobile-slider-img bg-gray-300 h-[120px] w-[90px] -mt-10 rounded-xl">
            {children}
          </div>
          <div className="test-mobile-slider-userInfo flex-grow relative">
            <p className="flex i">
              <TiStarFullOutline className="text-yellow-500 text-lg" />
              <span className="rating text-sm font-semibold montserrat">
                ({ratingValue})
              </span>
            </p>
            <h4 className="font-[500] mt-1">{userName}</h4>
            <p className="text-gray-500 text-sm">{position}</p>
            <BiSolidQuoteRight className="absolute top-0 right-0 text-3xl text-gray-500" />
          </div>
        </div>

        <p className="mt-3 text-sm h-[130px] overflow-y-auto scrollbar">
          {comment}
        </p>
      </div>
    </div>
  );
};

Test_MobileSlider_Card.propTypes = {
    children: PropTypes.node.isRequired,
    imgIndex: PropTypes.number.isRequired,
    ratingValue: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  };

export default Test_MobileSlider_Card;
