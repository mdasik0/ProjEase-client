import PropTypes from "prop-types";
import { FaMoon } from "react-icons/fa";
import { MdDoNotDisturbOn } from "react-icons/md";

const ChangeStatusDropdown = ({statusRef,status}) => {
    return (
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
    );
};

ChangeStatusDropdown.propTypes = {
    statusRef: PropTypes.object.isRequired,
    status: PropTypes.bool.isRequired,
};

export default ChangeStatusDropdown;