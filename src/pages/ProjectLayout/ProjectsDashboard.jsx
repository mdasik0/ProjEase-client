import { useSelector } from "react-redux";
import EventCalender from "../../components/ProjectLayout/ProjectDash/EventCalender/EventCalender";
import PDAllMembers from "../../components/ProjectLayout/ProjectDash/PDAllMembers";
import QuickActionsProjDash from "../../components/ProjectLayout/ProjectDash/QuickActionsProjDash";
import TasksTotalOverview from "../../components/ProjectLayout/ProjectDash/TasksTotalOverview";
import PDAnnouncement from "../../components/ProjectLayout/ProjectDash/PDAnnouncement";

const ProjectsDashboard = () => {

  const {projectData} = useSelector(state => state.projectSlice);
  return (
    <div className="p-3 w-full h-screen">
      <div className="search w-full h-16 rounded-lg border px-3 border-gray-300 bg-gray-50 mb-3">
        <div>
          <sub>name</sub>
          <h3 className="text-lg font-[500]">{projectData?.projectName}</h3>
        </div>
      </div>
      <div className="w-full flex gap-3">
        <div className="w-3/5 flex flex-col gap-3">
          <div className="flex gap-3">
          <TasksTotalOverview />
          <QuickActionsProjDash />
          </div>
          <div className="flex gap-3">
            {/* All Members View */}
            <PDAllMembers />
            <PDAnnouncement />
          </div>
        </div>
        <div className="w-2/5">
        <EventCalender />
        </div>
      
      </div>
    </div>
  );
};

export default ProjectsDashboard;
