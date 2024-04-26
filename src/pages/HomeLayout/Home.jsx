// import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const Home = () => {

  const {themes} = useSelector((state) => state.otherSlice)



  return (
    <div
      className={`h-screen w-screen ${
        themes === "white" || themes === "light"
          ? "bg-white"
          : "bg-zinc-900 text-white"
      }`}
    >
      Homepage
      
    </div>
  );
};

export default Home;
