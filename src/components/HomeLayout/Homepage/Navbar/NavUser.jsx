import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { MdDoNotDisturbOn, MdOutlineLogout } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";

const NavUser = ({ user }) => {
  const [dropdown, setDropdown] = useState(false);
  const [status, setStatus] = useState(false);

  const dropdownRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        statusRef.current &&
        !statusRef.current.contains(event.target)
      ) {
        setDropdown(false);
        setStatus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {user ? (
        <div
          onClick={() => setDropdown(!dropdown)}
          className="border border-gray-300 p-2 pe-3 rounded-xl bg-gray-100 hover:bg-gray-200 duration-300 active:scale-95 select-none flex gap-2  cursor-pointer"
        >
          <div className="avatar online">
            <div className="w-10 h-10 object-cover rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-0">
            <span>Md Asik</span>
            <div className="-mt-1">
              <span className="text-[12px] text-gray-500 ">Online</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link to={"/auth/sign-in"}>Login</Link>
          <Link
            to={"/auth/sign-up"}
            className="bg-black text-white px-6 py-3 ms-4 rounded-full"
          >
            Register
          </Link>
        </div>
      )}
      <div
        ref={dropdownRef}
        className={`border p-3 rounded-2xl absolute text-sm ${
          dropdown
            ? "top-[80px] opacity-100 scale-100"
            : "top-[-100px] disable opacity-0 scale-50"
        } duration-500 right-0 w-[190px] bg-gray-100 border-gray-300`}
      >
        <ul className="flex flex-col gap-1 relative">
          <li
            onClick={() => setStatus(!status)}
            className="cursor-pointer duration-300 hover:bg-gray-300 py-1.5 px-3 rounded-lg flex items-center gap-2"
          >
            <p className="bg-green-500 w-3 h-3 rounded-full border border-white"></p>{" "}
            Change Status
          </li>
          <li className="cursor-pointer duration-300 hover:bg-gray-300 py-1.5 px-3 rounded-lg flex items-center gap-2">
            <LuUserSquare2 className="text-lg" />
            User Dashboard
          </li>
          <li className="cursor-pointer duration-300 hover:bg-gray-300 py-1.5 px-3 rounded-lg flex items-center gap-2">
            <MdOutlineLogout className="text-lg" /> Log out
          </li>
          <ul
            ref={statusRef}
            className={`absolute top-[-13px] ${
              status
                ? "right-[190px] opacity-100 scale-100"
                : "right-[-300px] opacity-0 scale-50"
            } bg-gray-100 border p-3 rounded-xl w-[170px] duration-500`}
          >
            <li className="hover:bg-gray-300 px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
              <p className="bg-green-500 w-4 h-4 rounded-full border border-white"></p>{" "}
              Online
            </li>
            <li className="hover:bg-gray-300 px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
              <FaMoon className=" text-yellow-500" /> Idle
            </li>
            <li className="hover:bg-gray-300 px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
              <MdDoNotDisturbOn className="text-red-500 text-lg" /> Do not
              disturb
            </li>
            <li className="hover:bg-gray-300 px-2 py-1.5 rounded-md cursor-pointer flex items-center gap-2">
              <p className="w-4 h-4 border-4 border-gray-400 rounded-full"></p>{" "}
              Invisible
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

NavUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default NavUser;
