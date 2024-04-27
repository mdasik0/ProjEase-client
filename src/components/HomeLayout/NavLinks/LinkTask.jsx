import { useState } from "react";
import { GoTasklist } from "react-icons/go";
import { NavLink } from "react-router-dom";

const LinkTask = () => {

   
  const [position, setPosition] = useState(false);
  return (
    <NavLink
      onMouseLeave={() => setPosition(false)}
      onMouseEnter={() => setPosition(true)}
      className="relative flex flex-col items-center h-[24px] overflow-y-hidden "
      to={"/tasks"}
    >
      <GoTasklist
        className={`text-2xl absolute duration-300 ${
          position ? "bottom-6" : "bottom-0"
        }`}
      />
      <span
        className={`${position ? "opacity-100" : "opacity-0"} duration-300`}
      >
        Tasks
      </span>
    </NavLink>
  );
};

export default LinkTask;
