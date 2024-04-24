import { useEffect, useState } from "react";

const Home = () => {
  const [mode, setMode] = useState(null);

  const handleDark = () => {
    const newMode = mode === "dark" ? "white" : "dark";
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  };

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    setMode(storedMode || "light"); // default to "light" if no mode is stored
  }, []);

  return (
    <div className={`h-screen w-screen ${(mode === "white" || mode === "light") ? "bg-white" : "bg-zinc-900 text-white"}`}>
      Homepage
      <div>
        <button onClick={handleDark}>{mode}</button>
      </div>
    </div>
  );
};

export default Home;
