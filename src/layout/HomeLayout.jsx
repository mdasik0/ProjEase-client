import { Outlet } from "react-router-dom";
import Navbar from "../components/HomeLayout/Navbar";
import { useSelector } from "react-redux";


const HomeLayout = () => {
  const {themes} = useSelector((state) => state.otherSlice)

  return (
    <div className={`h-screen w-screen ${
      themes === "white" || themes === "light"
        ? "bg-white"
        : "bg-zinc-900 text-white"
    }`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
