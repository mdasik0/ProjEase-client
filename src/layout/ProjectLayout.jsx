import { useDispatch, useSelector } from "react-redux";
import ProjectAction from "../components/ProjectLayout/ProjectAction";
import Project_sidebar from "../components/Shared/Project_sidebar";
import { Outlet } from "react-router-dom";
import { useGetProjectQuery } from "../redux/api/projectsApi";
import { useEffect } from "react";
import { storeActiveProject } from "../redux/features/projectSlice";
import { updateTaskInit } from "../redux/features/tasksSlice";
import { useGetTasksInitQuery } from "../redux/api/tasksApi";

const ProjectLayout = () => {
  const { userData, isLoading } = useSelector((state) => state.userSlice);

  const joinedProjects = userData?.joinedProjects;

  const dispatch = useDispatch();
  const activeProjectId = joinedProjects?.find(
    (p) => p.status === "active"
  ).projectId;

  const { data: projectData } = useGetProjectQuery(activeProjectId, {
    skip: !activeProjectId,
  });

  const _id = projectData?.taskId;

  const { data: getTaskInit } = useGetTasksInitQuery(_id, {
    skip: !_id,
  });

  // animation
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
    }; // Clean up the timer on component unmount
  }, []);

  useEffect(() => {
    if (projectData) {
      dispatch(storeActiveProject(projectData));
    } else {
      // console.log("no project found");
    }
    if (getTaskInit) {
      dispatch(updateTaskInit(getTaskInit));
    }
  }, [projectData, getTaskInit]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (joinedProjects) {
    return (
      <div className="flex items-start">
        <Project_sidebar />
        <Outlet />
      </div>
    );
  } else {
    return (
      <>
        <div className="anim-backdrop-project-sp absolute w-screen h-screen top-0 left-0 bg-white z-50 flex items-center justify-center">
          <h1 className={`text-5xl font-[500] poppins project-ps-title`}>
            <span className="text-1">Welcome</span>{" "}
            <span className="text-2">to</span>{" "}
            <span className="text-3">Your</span>{" "}
            <span className="text-4">Project</span>{" "}
            <span className="text-5">Space!</span>
          </h1>
        </div>
        <ProjectAction />
      </>
    );
  }
};

export default ProjectLayout;
