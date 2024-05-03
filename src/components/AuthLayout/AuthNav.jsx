import { NavLink } from "react-router-dom";

const AuthNav = () => {
    return (
        <>
          <NavLink to={"/auth/sign-in"}>
            {" "}
            <button className="bg-zinc-800 text-white border-zinc-600 border px-2 py-1 rounded-tl-full rounded-bl-full ">
              Login
            </button>
          </NavLink>
          <NavLink to={"/auth/sign-up"}>
            <button className="bg-zinc-800 text-white border-zinc-600 border px-2 py-1 rounded-tr-full rounded-br-full">
              Register
            </button>
          </NavLink>  
        </>
    );
};

export default AuthNav;