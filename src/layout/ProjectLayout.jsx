import { useDispatch, useSelector } from "react-redux";
import ProjectAction from "../components/ProjectLayout/ProjectAction";
import Project_sidebar from "../components/Shared/Project_sidebar";
import { Outlet } from "react-router-dom";
import { useGetProjectQuery } from "../redux/api/projectsApi";
import { useEffect } from "react";
import { storeActiveProject } from "../redux/features/projectSlice";

const ProjectLayout = () => {
  const { userData, isLoading } = useSelector((state) => state.userSlice);

  const joinedProjects = userData?.joinedProjects;

  // if projects is available then show the project dashboard
  // if the project is not available then show create or join a project hyperlink

  const dispatch = useDispatch();
  console.log();
  const activeProjectId = joinedProjects?.find(
    (p) => p.status === "active"
  ).projectId;

  const { data } = useGetProjectQuery(activeProjectId);

  useEffect(() => {
    if (data) {
      dispatch(storeActiveProject(data));
    }
  }, [data]);
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (joinedProjects) {
    return (
      <div className="flex">
        <Project_sidebar />
        <Outlet />
      </div>
    );
  } else {
    return (
      <>
        <ProjectAction />
      </>
    );
  }
};

export default ProjectLayout;
