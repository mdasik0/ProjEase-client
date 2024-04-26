import { useState } from "react";
import { PiChats } from "react-icons/pi";
import { Link } from "react-router-dom";

const LinkChats = () => {

   
  const [position, setPosition] = useState(false);
  return (
    <Link
      onMouseLeave={() => setPosition(false)}
      onMouseEnter={() => setPosition(true)}
      className="relative flex flex-col items-center h-[20px] overflow-y-hidden "
      to={"/chats"}
    >
      <PiChats
        className={`text-xl absolute duration-300  ${
          position ? "bottom-5" : "bottom-0"
        }`}
      />
      <span
        className={`${position ? "opacity-100" : "opacity-0"} duration-300`}
      >
        Chats
      </span>
    </Link>
  );
};

export default LinkChats;
