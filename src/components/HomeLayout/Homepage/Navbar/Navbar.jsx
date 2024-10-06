import { Link } from "react-router-dom";
import fullLogo from "/logo/Full-logo/logo-white-ov2.png";
import miniLogo from "/logo/mini-logo/MINI_LOGO_FOR_WHITE_BG.png";
import NavUser from "./NavUser";
import { useEffect } from "react";
import MobileNavUser from "./MobileNavUser";
import { GoFileDirectory, GoHome } from "react-icons/go";
import { LuUserCircle } from "react-icons/lu";
import { TbArrowRoundaboutRight } from "react-icons/tb";
const Navbar = () => {
  return (
    <>
      <DesktopAndTabNav />
      <MobileNav />
    </>
  );
};

export default Navbar;

const DesktopAndTabNav = () => {
  const user = true;
  
  return (
    <nav
    className={`max-w-[90vw] mx-auto hidden md:flex items-center justify-between ${
      user ? "my-4" : "my-8"
    }`}
    >
      <div>
        <img className="h-10" src={fullLogo} alt="projease website logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex items-center gap-6 pr-6">
          <li>
            <Link
              className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full"
              to={"/"}
              >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full"
              to={"/"}
              >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full"
              to={"/"}
              >
              Projects
            </Link>
          </li>
        </ul>
        {/* user box */}
        <NavUser user={user} />
      </div>
    </nav>
  );
};

const MobileNav = () => {
  useEffect(() => {
    const inputElement = document.querySelector('.hamburger-menu input');
    const backdrop = document.querySelector('.sidebar-backdrop');

    const handleMenuChange = function() {
      if (this.checked) {
        backdrop.classList.remove("hidden")
      } else {
        backdrop.classList.add("hidden")
      }
    };

    inputElement.addEventListener('change', handleMenuChange);

    return () => {
      inputElement.removeEventListener('change', handleMenuChange);
    };
  }, []);
  return (
   <div className="flex md:hidden justify-between items-center mx-4 mt-4">
    <div>
      <img className="w-12 h-12" src={miniLogo} alt="mini logo of projease" />
    </div>
    <div>
      <label className="hamburger-menu">
        <input type="checkbox" />
      </label>  
      <aside className="sidebar">
          <MobileNavUser />
          <Link className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center" to={'/'}><GoHome className="text-lg" />Home</Link>
          <Link className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center" to={'/'}><TbArrowRoundaboutRight />About</Link>
          <Link className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center" to={'/'}><GoFileDirectory />Project</Link>
          <Link className="bg-[#2a2a2a] px-4 py-3 mt-2 rounded-[10px] border duration-300  border-[#3f3f3f] hover:bg-[#3f3f3f] flex gap-1.5 items-center" to={'/'}><LuUserCircle className="text-lg" />User Dashboard</Link>
      </aside>
    </div>
    <div className="sidebar-backdrop hidden">

    </div>
   </div>
  );
};
