import { useDispatch, useSelector } from "react-redux";
import ProjectAction from "../components/ProjectLayout/ProjectAction";
import Project_sidebar from "../components/Shared/Project_sidebar";
import { Outlet } from "react-router-dom";
import { useGetProjectQuery } from "../redux/api/projectsApi";
import { useEffect, useMemo } from "react";
import { storeActiveProject } from "../redux/features/projectSlice";
import { updateTaskInit } from "../redux/features/tasksSlice";
import { useGetTasksInitQuery } from "../redux/api/tasksApi";
import RedirectHome from "../components/Shared/RedirectHome";

const ProjectLayout = () => {
  const { userData, isLoading } = useSelector((state) => state.userSlice);
  const joinedProjects = userData?.joinedProjects;

  const dispatch = useDispatch();

  const activeProjectId = useMemo(() => {
    return joinedProjects?.find((p) => p.status === "active")?.projectId;
  }, [joinedProjects]);

  const { data: projectData } = useGetProjectQuery(activeProjectId, {
    skip: !activeProjectId,
  });

  const _id = projectData?.taskId;
  const { data: getTaskInit } = useGetTasksInitQuery(_id, { skip: !_id });

  useEffect(() => {
    if (projectData) {
      dispatch(storeActiveProject(projectData));
    }
  }, [projectData,dispatch]);

  useEffect(() => {
    if (getTaskInit) {
      dispatch(updateTaskInit(getTaskInit));
    }
  }, [getTaskInit,dispatch]);

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
        <RedirectHome />
        <ProjectAction />
      </>
    );
  }
};

export default ProjectLayout;