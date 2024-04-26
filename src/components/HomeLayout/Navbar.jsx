import { Link } from "react-router-dom";

import {
  MdOutlineNotificationsActive,
  MdOutlineNotifications,
} from "react-icons/md";
import LinkTask from "./NavLinks/LinkTask";
import LinkChats from "./NavLinks/LinkChats";
import LinkVideoCall from "./NavLinks/LinkVideoCall";
import ThemeChanger from "./NavLinks/ThemeChanger";
const Navbar = () => {
  const notifications = false;
  return (
    <nav className="flex justify-between px-20 py-6">
      <h2>logo</h2>
      <ul className="flex justify-between w-2/6">
        <li>
          <LinkTask />
        </li>
        <li>
          <LinkVideoCall />
        </li>
        <li>
          <LinkChats />
        </li>
        <li>
          <Link to={""}>
            {notifications ? (
              <MdOutlineNotificationsActive className="text-[22px]" />
            ) : (
              <MdOutlineNotifications className="text-[22px]" />
            )}
          </Link>
        </li>
        <li>
          <ThemeChanger />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
