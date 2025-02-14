
import PropTypes from "prop-types";
import { testimonials } from "../../Shared/resources";
import Test_MobileSlider_Card from "./Test_MobileSlider_Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonial_MobileSlider = ({showNextTest,showPrevTest,imgIndex}) => {
  return (
    <div className="block sm:hidden">
      <div className="flex items-center w-full overflow-hidden">
      {testimonials.map(({ _id, ratingValue, userInfo, comment }) => {
                return (
                  <Test_MobileSlider_Card
                    key={_id}
                    imgIndex={imgIndex}
                    ratingValue={ratingValue}
                    userName={userInfo.name}
                    position={userInfo.position}
                    comment={comment}
                  >
                    <img
                      className="h-full w-full object-cover object-top rounded-xl"
                      src={userInfo.image}
                      alt="user image"
                    />
                  </Test_MobileSlider_Card>
                );
              })}
      </div>
      <div className="test-mobile-slider-nav h-[70px] px-2 pt-4 flex gap-3">
        <button onClick={showPrevTest} className="p-3 h-fit w-fit border border-gray-400 hover:bg-gray-400 hover:text-gray-50 duration-300 rounded-full">
          <IoIosArrowBack />
        </button>
        <button onClick={showNextTest} className="p-3 h-fit w-fit border border-gray-400 hover:bg-gray-400 hover:text-gray-50 duration-300 rounded-full">
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

Testimonial_MobileSlider.propTypes = {
    showNextTest: PropTypes.func.isRequired,
    showPrevTest: PropTypes.func.isRequired,
    imgIndex: PropTypes.number.isRequired,
  };

export default Testimonial_MobileSlider;
