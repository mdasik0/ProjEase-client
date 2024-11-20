import { useEffect } from "react";
import TitleandSub from "../../components/ProjectLayout/TitleandSub";

const CreateProject = () => {
  useEffect(() => {
    const titleSpans = document.querySelectorAll(".project-ps-title");
    const timer = setTimeout(() => {
      titleSpans.forEach((span) => {
        span.classList.add("disappear");
      });
    }, 3200);
    const timertwo = setTimeout(() => {
      const fakebg = document.querySelector(".anim-backdrop-project-sp");
        fakebg.classList.add("bg-disappear");
    }, 4000);
    const timerthree = setTimeout(() => {
      const fakebg = document.querySelector(".anim-backdrop-project-sp");
        fakebg.classList.add("hidden");
    }, 5000);

    return () => {
      clearTimeout(timer); 
      clearTimeout(timertwo); 
      clearTimeout(timerthree); 
    } // Clean up the timer on component unmount
  }, []);

// pura text hidden

  return (
    <div className="w-screen h-screen px-20 pt-16 relative">
      <div className="anim-backdrop-project-sp absolute w-screen h-screen top-0 left-0 bg-white z-50 flex items-center justify-center">
        <h1 className={`text-5xl font-[500] poppins project-ps-title`}>
          <span className="text-1">Welcome</span>{" "}
          <span className="text-2">to</span>{" "}
          <span className="text-3">Your</span>{" "}
          <span className="text-4">Project</span>{" "}
          <span className="text-5">Space!</span>
        </h1>
      </div>
      <TitleandSub title='Create new project' subTitle='Let&apos;s get your ideas organized and your team ready to
          collaborate. Fill in the details below to start building your project.'>
<form className="w-1/3">
          <div className="mb-4 relative">
            <label
              className="text-sm text-gray-600 block mb-1"
              htmlFor="project-name"
            >
              Project Name
            </label>
            <input
              className="border-[2px] border-gray-500 block w-full px-3 py-2 rounded-lg"
              placeholder="Enter project name here"
              required
              type="text"
              name="project-name"
              id="project-name"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="text-sm text-gray-600 block mb-1"
              htmlFor="project-description"
            >
              Project Description
            </label>
            <textarea
              className="border-[2px] border-gray-500 block w-full px-3 py-2 rounded-lg h-[150px]"
              placeholder="Enter project description here"
              required
              type="text"
              name="project-description"
              id="project-description"
            />
          </div>
        </form>
      </TitleandSub>
    </div>
  );
};

export default CreateProject;
