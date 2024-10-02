import { Link } from "react-router-dom";
import fullLogo from "/logo/Full-logo/Full-logo-Projease.png";
import miniLogo from "/logo/mini-logo/MINI_LOGO_FOR_WHITE_BG.png";
import NavUser from "./NavUser";
import { useEffect } from "react";
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
    className={`max-w-[92vw] mx-auto hidden md:flex items-center justify-between ${
      user ? "my-4" : "my-8"
    }`}
    >
      <div>
        <img className="h-8" src={fullLogo} alt="projease website logo" />
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
          <Link to={'/'}>Home</Link>
          <Link to={'/'}>About</Link>
          <Link to={'/'}>Project</Link>
          <Link to={'/'}>User Dashboard</Link>
      </aside>
    </div>
    <div className="sidebar-backdrop hidden">

    </div>
   </div>
  );
};
