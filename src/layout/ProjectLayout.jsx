import { useSelector } from "react-redux";
import ProjectAction from "../components/ProjectLayout/ProjectAction";
import Project_sidebar from "../components/Shared/Project_sidebar";
import { Outlet } from "react-router-dom";

const ProjectLayout = () => {
  const { userData } = useSelector((state) => state.userSlice);

  const joinedProjects = userData?.joinedProjects;

  // if projects is available then show the project dashboard
  // if the project is not available then show create or join a project hyperlink


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
