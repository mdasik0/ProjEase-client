import LinkTask from "./NavLinks/LinkTask";
import LinkChats from "./NavLinks/LinkChats";
import LinkVideoCall from "./NavLinks/LinkVideoCall";
import ThemeChanger from "./NavLinks/ThemeChanger";
import Notification from "./NavLinks/Notification";
import User from "./NavLinks/User";
import { Link } from "react-router-dom";
import Logo from "../Shared/Logo";
const Navbar = () => {
  return (
    <nav className="flex justify-between px-20 py-6">
      <Link to={'/'}>
        <Logo />
      </Link>
      <ul className="flex justify-between gap-6">
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
          <Notification />
        </li>
        <li>
          <ThemeChanger />
        </li>
        <li>
          <User />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
