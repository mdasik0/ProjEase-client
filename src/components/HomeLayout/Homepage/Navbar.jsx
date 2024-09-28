import { Link } from "react-router-dom";
import fullLogo from "../../../../public/logo/Full-logo/Full-logo-Projease.png";
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
        {user ? (
          <div className="border border-gray-200 p-2 pe-3 rounded-xl bg-gray-100 hover:bg-gray-200 duration-300 active:scale-95 select-none flex gap-2 poppins cursor-pointer">
            <div className="avatar online">
              <div className="w-10 h-10 object-cover rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-0">
              <span>Md Asik</span>
              <div className="-mt-1">
                <span className="text-[12px] text-gray-500 ">Online</span>

                <span></span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Link to={"/auth/sign-in"}>Login</Link>
            <Link
              to={"/auth/sign-up"}
              className="bg-black text-white px-6 py-3 ms-4 rounded-full"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
