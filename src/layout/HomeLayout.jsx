import { Outlet } from "react-router-dom";
import Sidebar from "../components/HomeLayout/Sidebar";

const HomeLayout = () => {
  return (
    <div className="">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
