import miniLogo from "/logo/MINI_LOGO_FOR_BLACK_BG.svg";
import miniLogoblack from "/logo/MINI_LOGO_FOR_WHITE_BG.svg";
import { FiArrowUpRight } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <section>
      {/* header text */}
      <div className="flex flex-col justify-center items-center ">
        {/* TODO: add small pngs and decorate the header section */}
        <div className="text-center mt-10 poppins">
          <h1 className="text-6xl mb-10 font-semibold">
            Centralize and
            <span className="bg-gray-200  rounded-3xl px-3 pb-3">Manage</span>
            All Your{" "}
            <span className="bg-gray-200  rounded-3xl px-3 pb-3">Projects</span>
          </h1>
          <h1 className="text-6xl font-semibold">in One Environment</h1>
        </div>
        {/* subtitle section */}
        <div className="flex w-full justify-between items-center px-[80px] ">
          <p className="w-[270px]">
            Manage All Your Applications in One Centralized Platform. Eliminate
            the Need for Multiple Tools and Interfaces
          </p>
          <button className="bg-stone-800 hover:bg-stone-200 text-white hover:text-black duration-500  px-6 py-2.5  rounded-full flex items-center gap-2">
            Get started <FaArrowRight />
          </button>
        </div>
      </div>
      {/* image and cards */}
      <div className="h-[480px] mx-20 flex items-center justify-between gap-5">
        <div className="bg-gray-300 rounded-3xl h-[210px] w-[210px] flex justify-center items-center bg-[url('/header-1stCard.jpg')] bg-cover">
          <img
            className="w-1/3 h-1/3"
            src={miniLogo}
            alt="projease mini logo"
          />
        </div>
        <div className="bg-gray-300 rounded-3xl h-3/4 w-[310px]">
          <div className="h-1/2 rounded-3xl p-6">
            <h4 className="text-xl font-bold montserrat text-center">
              100+ User Driven Projects
            </h4>
            <p className="text-center mt-1">
              Over 100 projects were built last month on our platform,
              empowering users to achieve more.
            </p>
          </div>
          <div className="bg-green-200 h-1/2 rounded-3xl p-6">
            <h4 className="text-xl font-bold montserrat text-center">
              6 Effective Project Strategies
            </h4>
            <p className="text-center mt-1">
              Utilize our platform&apos;s features to efficiently manage and
              elevate your project initiatives.
            </p>
          </div>
        </div>
        <div className="bg-gray-300 bg-[url('/header-main-image.png')] bg-center rounded-3xl h-full w-[300px]">
          <div className="w-full flex justify-center mt-8">
            <img
              className="w-1/5 h-1/5"
              src={miniLogoblack}
              alt="projease mini logo"
            />
          </div>
        </div>
        <div className="bg-gray-300 rounded-3xl h-3/4 w-[310px] bg-[url('/header-cards1.png')] p-5 flex flex-col justify-between">
          <div className="flex gap-1">
            <p className="text-white border border-white w-fit px-4 py-1 rounded-full ">
              Support
            </p>
            <p className="text-white border border-white w-fit px-4 py-1 rounded-full ">
              Contribute
            </p>
          </div>
          <div className="text-2xl">
            <p className="bg-white rounded-t-xl rounded-br-2xl pb-1 ps-3">
              Appreciate our service?
            </p>
            <p className="flex w-full gap-2">
              <span className="bg-white rounded-bl-xl pt-0 rounded-br-2xl px-3 pb-1 w-full shadow-rounder relative">
                Please support us!
              </span>
              <FiArrowUpRight className="text-white mt-2 cursor-pointer " />
            </p>
          </div>
        </div>
        <div className="bg-gray-300 rounded-3xl h-[210px] w-[210px] bg-[url('/header-5thCard.jpg')] bg-cover flex  justify-center items-center p-6 ">
          <Link to={"/"}>
            <div>
              <p className="text-lg px-2 pt-0.5 rounded-t-xl rounded-br-xl font-semibold bg-white">
                Create a
              </p>
              <div className="flex">
                <p className="text-lg px-2 pb-1 rounded-b-xl font-semibold bg-white">
                  project
                </p>
                <div className="cta-design-5th-card relative bg-white hover:bg-gray-300 duration-500 cursor-pointer h-fit w-fit p-1 rounded-full mt-1 ml-1">
                  <IoMdArrowForward />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
