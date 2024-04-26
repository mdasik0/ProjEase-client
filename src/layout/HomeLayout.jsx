import { Outlet } from "react-router-dom";
import Navbar from "../components/HomeLayout/Navbar";

const HomeLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
