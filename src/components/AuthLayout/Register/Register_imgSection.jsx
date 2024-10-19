import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import loginPageImg from '/backgroud-designs/header-main-image.png'

const Register_imgSection = () => {
  return (
    <div className={`lg:w-1/2 w-full lg:h-[610px] md:h-[350px] h-[180px] lg:rounded-none rounded-3xl overflow-hidden relative`}>
      {/* bg img */}
      <img
        className="w-full h-full absolute top-0 left-0 object-cover z-[1]"
        src={loginPageImg}
        alt=""
      />
      {/* overlay */}
      <div className="bg-[#000000a9] absolute top-0 left-0 z-[2] w-full h-full"></div>
      {/* content */}
      <div className="absolute top-0 left-0 h-full w-full text-white z-[3] flex p-14 justify-between flex-col">
        <h3 className="text-4xl md:block hidden">
        Step into ProjEase. Build better, <br /> together.
        </h3>
        <div>
          <p>Already have an account?</p>
          <Link to={"/auth/sign-in"}>
            <div className="text-5xl text-white relative gap-3 duration-500 cursor-pointer h-[48px] w-[338px] text-container-createOne overflow-hidden">
              <div className="absolute inset-0 flex text-yellow-500 z-10 yellow-text-create-one">
                Login Now! <IoArrowForward />
              </div>
              <div className="flex z-0">
                Login Now! <IoArrowForward className="text-white" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register_imgSection;
