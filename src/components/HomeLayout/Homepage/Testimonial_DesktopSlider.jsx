import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Test_CarouselCard from "./Test_CarouselCard";
import { testimonials } from "../../Shared/resources";

const Testimonial_DesktopSlider = ({
  showNextTest,
  showPrevTest,
  imgIndex,
}) => {
  return (
    <div className="desktop_slider-container md:block hidden my-10 relative w-fit mx-auto">
      <div className="testimonial-slider flex w-[890px] overflow-hidden">
        {testimonials.map(({ _id, ratingValue, userInfo, comment }) => {
          return (
            <Test_CarouselCard
              key={_id}
              imgIndex={imgIndex}
              ratingValue={ratingValue}
              userName={userInfo.name}
              position={userInfo.position}
              comment={comment}
            >
              <img
                className="h-full w-full object-cover object-top rounded-3xl"
                src={userInfo.image}
                alt="user image"
              />
            </Test_CarouselCard>
          );
        })}
      </div>
      <button
        onClick={showPrevTest}
        className="prev p-2 shadow bg-gray-100 border border-gray-400 rounded-full text-xl absolute top-0 bottom-0 -left-14"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={showNextTest}
        className="next p-2 shadow bg-gray-100 border border-gray-400 rounded-full text-xl absolute top-0 bottom-0 -right-14"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

Testimonial_DesktopSlider.propTypes = {
  showNextTest: PropTypes.func.isRequired,
  showPrevTest: PropTypes.func.isRequired,
  imgIndex: PropTypes.number.isRequired,
};

export default Testimonial_DesktopSlider;
