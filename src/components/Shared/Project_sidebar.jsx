import { IoIosArrowDown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoChatbubblesOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import logo from '/logo/Full-logo/logo-white-ov2.png'
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { memo } from "react";

const Project_sidebar = memo(() => {
  const location = useLocation();
  const {chatInfo} = useSelector(state => state.chatSlice)
  const {userData} = useSelector(state => state.userSlice)

  const userUnseenMessageCount = 
  chatInfo?.unseenMessageCount && userData?._id in chatInfo.unseenMessageCount
    ? chatInfo.unseenMessageCount[userData._id]
    : null;


  // const unseenMessages = chatInfo ? chatInfo?.unseenMessageCount[userData?._id] : 0 ;


  const currentRoute = location.pathname.split("/")[2];

  return (
    <div style={{position: 'sticky', top:0}} className={`shadow-lg shadow-gray-300 min-w-[250px] min-h-screen duration-300`}>
      <div className=" flex items-center justify-center my-6">

        <img className="w-[120px]" src={logo} alt="projease logo" />
      </div>
      <div className="main-manu pl-10">
        <h4 className="text-xs text-gray-500  flex items-center relative">
          Main Menu <IoIosArrowDown className="absolute right-4" />
        </h4>
        <ul className="sidebar-navigation mt-3 mr-3 flex flex-col gap-2 text-[15px]">
          <li className="sidebar_main_nav">
            <NavLink 
              className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
              end
              to={"/projects"}
            >
              <LuLayoutDashboard />
              Dashboard
            </NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink
              className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
              to={"/projects/tasks"}
            >
              <MdTaskAlt />
              Tasks
            </NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink
              className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
              to={"/projects/chats"}
            >
              <IoChatbubblesOutline />
              Chat 
              {userUnseenMessageCount ? <span className="bg-red-500 px-[4px] min-h-4 min-w-4 text-center text-white text-xs rounded-full"> {userUnseenMessageCount}
                </span> : ""}
              
              
            </NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink
              className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
              to={"/projects/video-call"}
            >
              <AiOutlineVideoCamera /> Video Call
            </NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink
              className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
              to={"/projects/invite-members"}
            >
              <FiUserPlus />
              Invite Members
            </NavLink>
          </li>
          <li className="sidebar_main_nav">
            <NavLink
              className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
              to={"/"}
            >
              <IoHomeOutline />
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* submenu */}

      <div className="sub-manu pl-10 mt-3">
        <h4 className="text-xs text-gray-500  relative  flex items-center gap-24">
          {currentRoute} Menu <IoIosArrowDown className="absolute right-4" />
        </h4>
        {(currentRoute === 'tasks' ) && (
          <ul className="sidebar-navigation mt-3 mr-3 flex flex-col gap-2 text-[15px]">
            <li className="sidebar_main_nav">
              <NavLink
                className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
                end
                to={"/projects/tasks"}
              >
                <MdTaskAlt />
                Tasks
              </NavLink>
            </li>
            <li className="sidebar_main_nav">
              <NavLink
                className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
                to={"/projects/tasks/my-tasks"}
              >
                <MdTaskAlt />
                My tasks
              </NavLink>
            </li>
            <li className="sidebar_main_nav">
              <NavLink
                className={({ isActive }) => (isActive ? " bg-gray-200  flex items-center gap-2 px-3  py-1.5 rounded-lg" : " flex items-center gap-2 px-3  py-1.5 rounded-lg")}
                to={"/projects/tasks/overdue-tasks"}
              >
                <MdTaskAlt />
                Overdue tasks
              </NavLink>
            </li>
          </ul>
        )}
        {currentRoute === "video-call" && (
          <ul className="sidebar-navigation mt-3 mr-3 flex flex-col gap-2 text-[15px]">
            <li className="sidebar_main_nav">
              <NavLink
                className="flex  items-center gap-2 px-3  py-1.5 rounded-lg"
                to={"/tasks"}
              >
                <AiOutlineVideoCamera />
                Video Call
              </NavLink>
            </li>
          </ul>
        )}
        {currentRoute === "chats" && (
          <ul className="sidebar-navigation mt-3 mr-3 flex flex-col gap-2 text-[15px]">
            <li className="sidebar_main_nav">
              <NavLink
                className="flex  items-center gap-2 px-3  py-1.5 rounded-lg"
                to={"/tasks"}
              >
                <IoChatbubblesOutline />
                Chats
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
});

Project_sidebar.displayName = "ProjectSidebar";

export default Project_sidebar;
