import Logo from "./Logo";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();

  // const nav = {
  //   pathname: "/test/nav/video-call"
  // }

  const currentRoute = (location.pathname).split("/")[1]

  console.log(currentRoute); 
  return (
    <div className={`shadow-lg shadow-gray-300 h-screen w-56 duration-300 `}>
      <div className=" flex flex-col items-center justify-center my-6">
        <Logo />
        {/* 2 menus */}
        {/* main menu example: home, video call, tasks, chat etc.. */}
        {/* page specific menu. for tasks example: archive, my tasks, priority tasks etc.. */}
      </div>
      <div className="main-manu pl-10">
        <h4 className="text-xs text-gray-500  flex items-center gap-24">
          Main Menu <IoIosArrowDown />
        </h4>
        <ul className="sidebar-navigation mt-3 mr-3 flex flex-col gap-2 text-[15px]">
          
          <li className="sidebar_main_nav">
            <NavLink className="flex  items-center gap-2 px-3  py-1.5 rounded-lg" to={"/tasks"}><MdTaskAlt />Tasks</NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink className="flex items-center gap-2 px-3  py-1.5 rounded-lg" to={"/chats"}><IoChatbubblesOutline />Chat</NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink className="flex items-center gap-2 px-3  py-1.5 rounded-lg" to={"/video-call"}><AiOutlineVideoCamera /> Video Call</NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink className="flex items-center gap-2 px-3  py-1.5 rounded-lg" to={"/"}><IoHomeOutline />Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="main-manu pl-10 mt-3">
      <h4 className="text-xs text-gray-500  relative  flex items-center gap-24">
          {currentRoute} Menu <IoIosArrowDown className="absolute right-4"/>
        </h4>
      </div>
    </div>
  );
};

export default Sidebar;
