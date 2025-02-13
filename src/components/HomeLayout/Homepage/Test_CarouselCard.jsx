import { TiStarFullOutline, TiStarHalf } from "react-icons/ti";
import { BiSolidQuoteRight } from "react-icons/bi";
import PropTypes from "prop-types";

const Test_CarouselCard = ({
  ratingValue,
  imgIndex,
  userName,
  position = "user",
  comment,
  children,
}) => {
  // Function to generate rating stars
  const renderStars = (value) => {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <TiStarFullOutline key={i} />
        ))}
        {hasHalfStar && <TiStarHalf />}
      </>
    );
  };


  return (
    <div
      className="slider-card md:h-[350px] w-full mx-auto md:p-3 p-2 flex items-center gap-3 bg-[#1a1a1a] rounded-[35px] shadow-lg shadow-black/40 transition-transform duration-500"
      style={{
        transform: `translateX(-${imgIndex * 100}%)`,
      }}
    >
      <div className="slider-user-img md:block hidden h-full md:w-[340px] bg-red-500 rounded-3xl">
        {children}
      </div>
      <div className="slider-testimonial-content w-[350px] h-full flex-grow bg-gray-100 rounded-3xl relative shadow-lg shadow-black/20 md:p-8 p-3">
        <BiSolidQuoteRight className="text-[#1a1a1a] md:text-[100px] text-[50px] absolute opacity-55 md:bottom-0 bottom-24 right-3" />
        <div className="left-arrow md:block hidden bg-gray-100 h-10 w-10 rotate-45 absolute bottom-[30%] rounded-xl -left-4 arrow-shadow-test"></div>

        <div className="flex flex-row md:flex-col md:items-start items-center gap-3">
        <div className="rating md:flex hidden items-center gap-1">
          <div className="stars text-yellow-500 flex items-center">
            {renderStars(ratingValue)}
          </div>
          <span className="text-sm font-semibold montserrat">
            ({ratingValue})
          </span>
        </div>

        <div>
        <h4 className="user-name mt-2 font-[500] text-lg">{userName}</h4>
        <p className="text-sm text-gray-500">{position}</p>
        </div>
        </div>
        <div className="comment md:w-[450px] text-wrap w-screen mt-3">{comment}</div>
      </div>
    </div>
  );
};

Test_CarouselCard.propTypes = {
  index: PropTypes.number,
  ratingValue: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  position: PropTypes.string,
  comment: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  imgIndex: PropTypes.number.isRequired,
};

export default Test_CarouselCard;
