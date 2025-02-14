import { useState } from "react";
import { testimonials } from "../../Shared/resources";
import Testimonial_DesktopSlider from "./Testimonial_DesktopSlider";
import Testimonial_MobileSlider from "./Testimonial_MobileSlider";


const Testimonials = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const showNextTest = () => {
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
    <div className="md:max-w-[90vw] w-full md:p-0 p-2 mx-auto md:my-20">
      <Testimonials_Header />
      <Testimonial_DesktopSlider showNextTest={showNextTest} showPrevTest={showPrevTest} imgIndex={imgIndex} />
      <Testimonial_MobileSlider showNextTest={showNextTest} showPrevTest={showPrevTest} imgIndex={imgIndex}/>
    </div>
  );
};

export default Testimonials;

const Testimonials_Header = () => {
  return (
    <div>
      <p className="text-gray-500 font-[500] text-center mb-10">Testimonials</p>
      <h1 className="text-center text-5xl font-[500] mb-10">
        What Our Users has to say about us?
      </h1>
    </div>
  );
};


