import { useState } from "react";
import { GoTasklist } from "react-icons/go";
import { Link } from "react-router-dom";

const LinkTask = () => {

   
  const [position, setPosition] = useState(false);
  return (
    <Link
      onMouseLeave={() => setPosition(false)}
      onMouseEnter={() => setPosition(true)}
      className="relative flex flex-col items-center h-[20px] overflow-y-hidden "
      to={"/tasks"}
    >
      <GoTasklist
        className={`text-xl absolute duration-300 ${
          position ? "bottom-5" : "bottom-0"
        }`}
      />
      <span
        className={`${position ? "opacity-100" : "opacity-0"} duration-300`}
      >
        Tasks
      </span>
    </Link>
  );
};

export default LinkTask;
