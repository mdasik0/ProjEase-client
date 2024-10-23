import logo from "/logo/Full-logo/logo-white-ov2.png";
import { LuUserSquare } from "react-icons/lu";
const Enter_your_name = () => {
  return (
    <div className="w-screen ">
      <div className="md:max-w-[92vw] md:mx-auto mx-8 md:mt-12 my-6">
        <img className="h-10 md:h-12" src={logo} alt="projease logo" />
        <div className="flex flex-col md:h-[80vh] h-[86vh]">
          <div className="md:m-8 mt-4 flex-grow">
            <h1 className="md:text-5xl text-4xl font-[500]">
              Please enter your name
            </h1>
            <p className="mt-2 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor,
              fugit.
            </p>
            <form className="mt-6">
              <div className="mb-4 relative md:w-[500px]">
                <label className="text-sm block mb-1" htmlFor="firstname">
                  First name
                </label>
                <input
                  className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-lg"
                  placeholder="john"
                  required
                  type="text"
                  name="firstname"
                  id="firstname"
                />
                <div
                  className="bg-gray-200 w-fit p-1.5 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open"
                  data-tip="firstname"
                >
                  <LuUserSquare />
                </div>
              </div>
              <div className="mb-3 relative md:w-[500px]">
                <label className="text-sm block mb-1" htmlFor="lastname">
                  Last name
                </label>
                <input
                  className="border-[2px] border-gray-300 block w-full  px-3 py-2 rounded-lg"
                  placeholder="doe"
                  required
                  type="text"
                  name="lastname"
                  id="lastname"
                />
                <div
                  className="bg-gray-200 w-fit p-1.5 rounded-lg absolute bottom-2 right-2 hover:bg-gray-300 duration-500 cursor-pointer tooltip hover:tooltip-open"
                  data-tip="lastname"
                >
                  <LuUserSquare />
                </div>
              </div>
              <button className="bg-[#1a1a1a] px-6 py-2 text-white rounded-lg border-[#1a1a1a] border hover:bg-white hover:text-black duration-500 cursor-pointer mt-6">
                Next
              </button>
            </form>
          </div>
          <p className="text-sm w-full text-center mt-auto text-gray-400">
            2 of 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enter_your_name;
