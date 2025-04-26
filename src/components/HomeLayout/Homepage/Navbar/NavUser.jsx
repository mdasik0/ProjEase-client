import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { MdDoNotDisturbOn, MdOutlineLogout } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";
import avatar from "/avatar/avatar.png";
import Modal from "../../../Shared/Modal";
import { useDispatch } from "react-redux";
import ChangeStatusDropdown from "./ChangeStatusDropdown";
import { dayMonthYear } from "../../../../utils/getDate";
import { FaMoon } from "react-icons/fa";

const NavUser = ({
  user,
  userData,
  logOut,
  isLoading,
  onlineStatus,
  setOnlineStatus,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [status, setStatus] = useState(false);
  const dropdownRef = useRef();
  const statusRef = useRef();
  const dispatch = useDispatch();
  const fullName = userData?.name?.firstname + " " + userData?.name?.lastname;
  const nameCheck =
    fullName.length > 8 ? fullName.slice(0, 8) + "..." : fullName;

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
    <>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <div className="relative">
          {user ? (
            <div
              onClick={() => setDropdown(!dropdown)}
              className="border border-gray-300 p-2 pe-3 rounded-xl bg-gray-100 w-[150px] hover:bg-gray-200 duration-300 active:scale-95 select-none flex gap-2  cursor-pointer"
            >
              <div className="avatar">
                <div className="w-10 h-10 object-cover rounded-full ">
                  <img
                    src={userData?.image ? userData?.image : avatar}
                    alt="User Avatar"
                  />
                </div>
                <div className="online-status absolute top-0 -right-1 rounded-full">
                    {onlineStatus === "idle" ? (
                  <div className="bg-white p-0.5">
                      <FaMoon className=" text-yellow-500 text-xs bg-white" />
                  </div>
                    ) : (
                      onlineStatus === "do-not-disturb" ? <MdDoNotDisturbOn className="text-red-500 bg-white" /> : onlineStatus === "offline" ? <div className="bg-white p-0.5"><p className="w-3 h-3 border-[3px] border-gray-400 rounded-full"></p></div> : onlineStatus === "online" ? <div className="bg-white p-0.5"><p className="w-3 h-3 bg-green-400 rounded-full"></p></div> : ""
                    )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-0">
                <span className="tooltip tooltip-bottom" data-tip={fullName}>
                  {userData?.name ? nameCheck : userData?.email?.split("@")[0]}
                </span>
                <div className="-mt-1">
                  <span className="text-[12px] text-gray-500 whitespace-nowrap">
                    {onlineStatus ? onlineStatus : "online"}
                  </span>
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
              <UserInfo userData={userData} />
              <li
                onClick={() => logOut(dispatch)}
                className="cursor-pointer duration-300 hover:bg-gray-300 py-1.5 px-3 rounded-lg flex items-center gap-2"
              >
                <MdOutlineLogout className="text-lg" /> Log out
              </li>
              {/* status changing dropdown component */}
              <ChangeStatusDropdown
                statusRef={statusRef}
                setStatus={setStatus}
                status={status}
                setOnlineStatus={setOnlineStatus}
              />
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

NavUser.propTypes = {
  user: PropTypes.string,
  userData: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onlineStatus: PropTypes.string,
  setOnlineStatus: PropTypes.func.isRequired,
};

export default NavUser;

export const UserInfo = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const createdAt = dayMonthYear(userData?.created);
  const addressObj = userData?.address;
  const address =
    addressObj?.street +
    "," +
    addressObj?.city +
    "," +
    addressObj?.state +
    "," +
    addressObj?.country;
  return (
    <>
      <li
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer duration-300 hover:bg-gray-300 py-1.5 px-3 rounded
        -lg flex items-center gap-2"
      >
        <LuUserSquare2 className="text-lg" />
        User info
      </li>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-6 border-4 border-[#1a1a1a] rounded-2xl">
          <div className="flex items-start gap-6">
            <img
              className="w-2/5 rounded-full p-1 border border-gray-600"
              src={userData?.image}
              alt="user image"
            />
            <div>
              <h5 className="font-semibold text-gray-500 mb-3 text-sm">
                user info
              </h5>
              <div>
                <span className="text-sm text-gray-400">Name</span>
                <p className="mb-2 text-black">
                  {userData?.name?.firstname} {userData?.name?.lastname}
                </p>
                <span className="text-sm text-gray-400">Email</span>
                <p className="mb-2 text-black">{userData?.email}</p>
                <span className="text-sm text-gray-400">Account created</span>
                <p className="text-sm">{createdAt || "Not Available"}</p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-gray-600 mb-3">
              Additional info
            </h5>
            <div>
              <span className="text-sm text-gray-400">Birthday</span>
              <p className="mb-2 text-black">
                {userData?.birthday || "Not Available"}
              </p>
              <span className="text-sm text-gray-400">Bio</span>
              <p className="mb-2 text-black">
                {userData?.bio || "Not Available"}
              </p>
              <span className="text-sm text-gray-400">role</span>
              <p className="mb-2 text-black">{userData?.jobTitle || "User"}</p>
              <span className="text-sm text-gray-400">Address (private)</span>
              <p className="mb-2 text-black">{address || "Not Available"}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

UserInfo.propTypes = {
  userData: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.object,
    email: PropTypes.string,
    status: PropTypes.string,
    created: PropTypes.string,
    bio: PropTypes.string,
    jobTitle: PropTypes.string,
    birthday: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};
