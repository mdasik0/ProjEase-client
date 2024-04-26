import { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const LinkVideoCall = () => {

   
  const [position, setPosition] = useState(false);
  return (
    <Link
      onMouseLeave={() => setPosition(false)}
      onMouseEnter={() => setPosition(true)}
      className="relative flex flex-col items-center h-[20px] overflow-y-hidden "
      to={"/video-call"}
    >
      <AiOutlineVideoCameraAdd
        className={`text-xl absolute duration-300 ${
          position ? "bottom-5" : "bottom-0"
        }`}
      />
      <span
        className={`${position ? "opacity-100" : "opacity-0"} duration-300 `}
      >
        Video Call
      </span>
    </Link>
  );
};

export default LinkVideoCall;
