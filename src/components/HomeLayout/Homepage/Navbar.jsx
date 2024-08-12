import { GoHome } from "react-icons/go";
import { FaExclamation } from "react-icons/fa";
import logo from "/logo/svg-projease-logo.svg";
import ProjectsNav from "./ProjectsNav";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../Shared/Modal";
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const user = true;
  const userInfo = {
    image: "",
    name: "Md Asik",
  };



  return (
    <div className="flex justify-between items-start px-20 py-6">
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
      {user ? (
        <div
        // onclick open profile modal in homepage
        onClick={() => setIsOpen(!isOpen)}
          title={user && userInfo?.name}
          className="cursor-pointer duration-500 w-10 h-10 rounded-full"
        >
          {userInfo?.image ? (
            <img src={userInfo?.image} alt="userImage" />
          ) : (
            <span className="bg-green-500 hover:bg-green-600 active:scale-110 duration-500 rounded-full w-full h-full flex items-center justify-center text-white font-semibold">
              {userInfo?.name?.charAt(0)}
            </span>
          )}
        </div>
      ) : (
        <Link
          to={"/auth/sign-in"}
          className="login-button  cursor-pointer px-6 py-1.5 rounded-full"
        >
          Login
        </Link>
      )}

{/* modal */}
<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
  
</Modal>

    </div>
  );
};

export default Navbar;
