import { useState } from "react";
import Test_CarouselCard from "./Test_CarouselCard";
import { testimonials } from "../../Shared/resources";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const showNextTest = () => {
    console.log(testimonials.length, imgIndex);
    if (imgIndex === testimonials.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex((prevIndex) => prevIndex + 1);
    }
  };
  const showPrevTest = () => {
    console.log(testimonials.length, imgIndex);
    if (imgIndex === 0) {
      setImgIndex(testimonials.length - 1);
    } else {
      setImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="max-w-[90vw] mx-auto my-20">
      <p className="text-gray-500 font-[500] text-center mb-6">Testimonials</p>
      <h1 className="text-center text-5xl font-[500]">
        What Our Users has to say about us?
      </h1>
      <div className="slider-container my-10 relative w-fit mx-auto">
        <div className="testimonial-slider flex w-[890px] overflow-hidden">
          {testimonials.map(({ _id, ratingValue, userInfo, comment },index) => { 
            return <Test_CarouselCard
              key={_id}
              imgIndex={imgIndex}
              index={index}
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
    </div>
  );
};

export default Testimonials;
