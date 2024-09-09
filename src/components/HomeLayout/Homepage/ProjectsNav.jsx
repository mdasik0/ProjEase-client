import { BiDownArrow } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { TiGroup } from "react-icons/ti";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ProjectsNav = () => {
  const [open, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    // Check if the click was outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="relative z-50" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!open)}
        className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300 duration-500 relative z-50"
      >
        <div className="h-7 w-7 bg-white flex items-center justify-center rounded-full">
          <BiDownArrow />
        </div>
        <span className="ps-1.5 pe-3">Projects</span>
      </div>
      {open && (
        <div className="dropdown-container absolute -top-1 pt-1 right-[50%] translate-x-[50%] h-[133px] w-[120px] px-1.5 flex flex-col gap-2 rounded-3xl z-50">
          <div
            onClick={() => setIsOpen(!open)}
            className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300 duration-500 relative z-50"
          >
            <div className="h-7 w-7 bg-white flex items-center justify-center rounded-full">
              <BiDownArrow />
            </div>
            <span className="ps-1.5 pe-3">Projects</span>
          </div>
          <div className="dropdown-create flex items-center bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300 duration-500">
            <div className="h-7 w-7 bg-white flex items-center justify-center rounded-full">
              <GoPlus />
            </div>
            <Link to={'/create-project'} className="ps-1.5 pe-3">Create</Link>
          </div>
          <div className="dropdown-join flex items-center bg-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-300 duration-500">
            <div className="h-7 w-7 bg-white flex items-center justify-center rounded-full">
              <TiGroup />
            </div>
            <Link to={'/join-project'} className="ps-1.5 pe-3">Join</Link>
          </div>
        </div>
      )}
    </li>
  );
};

export default ProjectsNav;
