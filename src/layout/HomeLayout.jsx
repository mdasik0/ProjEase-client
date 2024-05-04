import { Outlet } from "react-router-dom";
import Navbar from "../components/HomeLayout/Navbar";


const HomeLayout = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
