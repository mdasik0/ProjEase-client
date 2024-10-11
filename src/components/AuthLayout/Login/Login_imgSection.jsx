import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login_imgSection = () => {
  return (
    <div className={`w-1/2 h-[610px] bg-green-500 relative`}>
      <img
        className="w-full h-full absolute top-0 left-0 object-cover z-[1]"
        src="../../../../public/backgroud-designs/header-main-image.png"
        alt=""
      />
      <div className="bg-[#000000a9] absolute top-0 left-0 z-[2] w-full h-full">
        <div className="absolute top-0 left-0 h-full w-full text-white z-[3] flex p-14 justify-between flex-col">
          <h3 className="text-4xl">
            Simplify teamwork. Power up your projects.
          </h3>
          <div>
            <p>Don&apos;t have an account?</p>
            <Link to={'/auth/sign-up'}>
            <div className="text-5xl text-white relative gap-3 duration-500 cursor-pointer h-[48px] w-[338px] text-container-createOne overflow-hidden">
              <div className="absolute inset-0 flex text-yellow-500 z-10 yellow-text-create-one">
                Create One! <IoArrowForward />
              </div>
              <div className="flex z-0">
                Create One! <IoArrowForward className="text-white" />
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_imgSection;
