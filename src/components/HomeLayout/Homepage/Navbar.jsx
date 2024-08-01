import { GoHome } from "react-icons/go";
import { FaExclamation } from "react-icons/fa";
import logo from "/logo/svg-projease-logo.svg";
import ProjectsNav from "./ProjectsNav";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex justify-between items-start px-20 pt-6">
      {/* logo */}
      <div>
        <img className="h-8 w-fit" src={logo} alt="" />
      </div>
      <ul className="flex gap-3 items-start">
        <li className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300 duration-500">
          <div className="h-7 w-7 bg-white flex items-center justify-center rounded-full ">
            <GoHome />{" "}
          </div>
          <span className="ps-1.5 pe-3">Home</span>
        </li>{" "}
        <li className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300 duration-500">
          <div className="h-7 w-7 bg-white flex items-center justify-center rounded-full ">
            <FaExclamation />{" "}
          </div>
          <span className="ps-1.5 pe-3">About</span>
        </li>{" "}
        <ProjectsNav />
      </ul>
      <ul>
        <li className="bg-gray-200 hover:bg-gray-300 duration-500 hover:border-gray-200 cursor-pointer border border-gray-400 px-6 py-1.5 rounded-full">
          <Link to={"/auth/sign-in"}>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
