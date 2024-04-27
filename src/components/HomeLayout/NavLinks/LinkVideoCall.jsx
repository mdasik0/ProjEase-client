import { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const LinkVideoCall = () => {

   
  const [position, setPosition] = useState(false);
  return (
    <NavLink
      onMouseLeave={() => setPosition(false)}
      onMouseEnter={() => setPosition(true)}
      className="relative flex flex-col items-center h-[24px] overflow-y-hidden "
      to={"/video-call"}
    >
      <AiOutlineVideoCameraAdd
        className={`text-2xl absolute duration-300 ${
          position ? "bottom-6" : "bottom-0"
        }`}
      />
      <span
        className={`${position ? "opacity-100" : "opacity-0"} duration-300 `}
      >
        Video Call
      </span>
    </NavLink>
  );
};

export default LinkVideoCall;
