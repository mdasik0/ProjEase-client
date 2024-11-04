import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import fullLogo from "/logo/Full-logo/logo-white-ov2.png";
import miniLogo from "/logo/mini-logo/MINI_LOGO_FOR_WHITE_BG.png";
import NavUser from "./NavUser";
import { useEffect } from "react";
import MobileNavUser from "./MobileNavUser";
import { GoFileDirectory, GoHome } from "react-icons/go";
import { LuUserCircle } from "react-icons/lu";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { MdLogin, MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../redux/features/userSlice";
import toast from "react-hot-toast";
const Navbar = () => {
  const dispatch = useDispatch();
  const {
    email: user,
    userData,
    isLoading,
  } = useSelector((state) => state.userSlice);
  const logOut = () => {
    dispatch(logoutUser());
    toast.success("User logged out successfully")
  };

  return (
    <>
      <DesktopAndTabNav
        isLoading={isLoading}
        logOut={logOut}
        user={user}
        userData={userData}
      />
      <MobileNav
        isLoading={isLoading}
        logOut={logOut}
        user={user}
        userData={userData}
      />
    </>
  );
};

export default Navbar;

const DesktopAndTabNav = ({ user, userData, logOut, isLoading }) => {
  return (
    <nav
      className={`max-w-[90vw] mx-auto hidden md:flex items-center justify-between ${
        user ? "my-4" : "my-8"
      }`}
    >
      <div>
        <img className="h-10" src={fullLogo} alt="projease website logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex items-center gap-6 pr-6">
          <li>
            <Link
              className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full"
              to={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full"
              to={"/"}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full"
              to={"/projects"}
            >
              Projects
            </Link>
          </li>
        </ul>
        {isLoading ? (
          <div className="border border-gray-300 w-[128px] h-[53px] p-2 pe-3 rounded-xl bg-gray-100 hover:bg-gray-200 duration-300 active:scale-95 select-none flex items-center justify-center gap-2  cursor-pointer">
          <span className="loading loading-spinner loading-md"></span>

          </div>
        ) : (
          <NavUser
            user={user}
            userData={userData}
            logOut={logOut}
            isLoading={isLoading}
          />
        )}
      </div>
    </nav>
  );
};

DesktopAndTabNav.propTypes = {
  user: PropTypes.string,
  userData: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const MobileNav = ({ user, userData, logOut, isLoading }) => {
  useEffect(() => {
    const inputElement = document.querySelector(".hamburger-menu input");
    const backdrop = document.querySelector(".sidebar-backdrop");

    const handleMenuChange = function () {
      if (this.checked) {
        backdrop.classList.remove("hidden");
      } else {
        backdrop.classList.add("hidden");
      }
    };

    inputElement.addEventListener("change", handleMenuChange);

    return () => {
      inputElement.removeEventListener("change", handleMenuChange);
    };
  }, []);
  return (
    <div className="flex md:hidden justify-between items-center mx-4 mt-4">
      <div>
        <img className="w-12 h-12" src={miniLogo} alt="mini logo of projease" />
      </div>
      <div>
        <label className="hamburger-menu">
          <input type="checkbox" />
        </label>
        <aside className="sidebar">
          <div className="flex flex-col gap-[10px]">
            {user && (
              <MobileNavUser userData={userData} isLoading={isLoading} />
            )}
            <Link
              className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center"
              to={"/"}
            >
              <GoHome className="text-lg" />
              Home
            </Link>
            <Link
              className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center"
              to={"/"}
            >
              <TbArrowRoundaboutRight />
              About
            </Link>
            <Link
              className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center"
              to={"/"}
            >
              <GoFileDirectory />
              Project
            </Link>
            {!user && (
              <>
                <Link
                  className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center"
                  to={"/auth/sign-in"}
                >
                  <MdLogin className="text-lg" />
                  Login
                </Link>
                <Link
                  className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center"
                  to={"/"}
                >
                  <LuUserCircle className="text-lg" />
                  Register
                </Link>
              </>
            )}
          </div>

          {user && (
            <>
              <button
                onClick={() => logOut()}
                className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-red-500 hover:bg-red-500 flex gap-1.5 items-center"
              >
                <MdOutlineLogout className="text-lg" />
                Log out
              </button>
            </>
          )}
        </aside>
      </div>
      <div className="sidebar-backdrop hidden"></div>
    </div>
  );
};

MobileNav.propTypes = {
  user: PropTypes.string,
  userData: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};