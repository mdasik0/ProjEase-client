import { GoHome } from "react-icons/go";
import { FaExclamation } from "react-icons/fa";
import logo from "/logo/logo-white.png";
import ProjectsNav from "./ProjectsNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserModal from "./UserModal";
const Navbar = () => {
  const userInfo = useSelector((state) => state.userSlice);
  const user = userInfo.email || null;
  const { isLoading } = userInfo;

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
        <UserModal userInfo={userInfo} user={user} />
      ) : (
        <Link
          to={"/auth/sign-in"}
          className="login-button  cursor-pointer px-6 py-1.5 rounded-full"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </Link>
      )}
    </div>
  );
};

export default Navbar;
