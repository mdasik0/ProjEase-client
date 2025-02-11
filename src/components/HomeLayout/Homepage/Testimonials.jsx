import Test_CarouselCard from "./Test_CarouselCard";
import user1 from "/testimonials/user1.jpg";


const Testimonials = () => {
  return (
    <div className="max-w-[90vw] mx-auto my-20">
      <p className="text-gray-500 font-[500] text-center mb-6">Testimonials</p>
      <h1 className="text-center text-5xl font-[500]">
        What Our Users has to say about us?
      </h1>
      <div className=" slider-container my-10">
        <Test_CarouselCard ratingValue={4.5} userName={'John Doe'} position={'Frontend Developer'} comment={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos dignissimos quidem in eaque deleniti iste aliquid illum, totam sapiente!'}>
          <img
                    className="h-full w-full object-cover object-top rounded-3xl"
                    src={user1}
                    alt="user image"
                  />
        </Test_CarouselCard>
      </div>
    </div>
  );
};

export default Testimonials;
