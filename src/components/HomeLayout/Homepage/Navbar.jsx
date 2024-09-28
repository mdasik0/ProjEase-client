import { Link } from "react-router-dom";
import fullLogo from "../../../../public/logo/Full-logo/Full-logo-Projease.png";
import NavUser from "./NavUser";
const Navbar = () => {
  const user = true

  return (
    <nav className={`max-w-[92vw] poppins mx-auto flex items-center justify-between ${user ? "my-4" : "my-8"}`}>
      <div>
        <img className="h-8" src={fullLogo} alt="projease website logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex items-center gap-6 pr-6">
          <li>
            <Link className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full" to={"/"}>Home</Link>
          </li>
          <li>
            <Link className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full" to={"/"}>About</Link>
          </li>
          <li>
            <Link className="hover:bg-gray-300 bg-gray-100 border border-gray-300 px-4 py-1.5 duration-500 rounded-full" to={"/"}>Projects</Link>
          </li>
        </ul>
        {/* user box */}
       <NavUser user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
