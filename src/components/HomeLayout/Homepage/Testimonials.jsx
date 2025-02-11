import { TiStarFullOutline, TiStarHalf } from "react-icons/ti";
import user1 from "/testimonials/user1.jpg";
import { BiSolidQuoteRight } from "react-icons/bi";
const Testimonials = () => {
  return (
    <div className="max-w-[90vw] mx-auto my-20">
      <p className="text-gray-500 font-[500] text-center mb-6">Testimonials</p>
      <h1 className="text-center text-5xl font-[500]">
        What Our Users has to say about us?
      </h1>
      <div className=" slider-container my-10">
        <div className="slider-card h-[350px] w-[900px] mx-auto p-3 flex items-center gap-3 bg-[#1a1a1a] rounded-[35px] ">
          <div className="slider-user-img h-full w-[340px] bg-red-500 rounded-3xl">
            <img
              className="h-full w-full object-cover object-top rounded-3xl"
              src={user1}
              alt="user image"
            />
          </div>
          <div className="slider-testimonial-content h-full flex-grow bg-gray-100 rounded-3xl relative shadow-lg shadow-black/20 p-8">
          <BiSolidQuoteRight className="text-[#1a1a1a] text-[100px] absolute opacity-55 bottom-0 right-3" />
            <div className="left-arrow bg-gray-100 h-10 w-10 rotate-45 absolute bottom-[30%] rounded-xl -left-4 arrow-shadow-test"></div>
            <div className="rating flex items-center gap-1">
              <div className="stars text-yellow-500 flex items-center">
                <TiStarFullOutline />
                <TiStarFullOutline />
                <TiStarFullOutline />
                <TiStarFullOutline />
                <TiStarHalf />
              </div>
              <span className="text-sm font-semibold montserrat">(4.5)</span>
            </div>
            <h4 className="user-name mt-2 font-[500] text-lg">
                John Doe
            </h4>
            <p className="text-sm text-gray-500">Frontend Developer</p>
            <div className="comment w-[450px] mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos dignissimos quidem in eaque deleniti iste aliquid illum, totam sapiente!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
