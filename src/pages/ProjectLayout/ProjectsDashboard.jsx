import QuickActionsProjDash from "../../components/ProjectLayout/ProjectDash/QuickActionsProjDash";
import TasksTotalOverview from "../../components/ProjectLayout/ProjectDash/TasksTotalOverview";


const ProjectsDashboard = () => {
  return (
    <div className="p-6 w-full h-screen">
      <div className="search w-full h-16 rounded-lg border px-3 border-gray-300 bg-gray-50 mb-6">
        <div>
          <sub>name</sub>
          <h3 className="text-lg font-[500]">Project Name</h3>
        </div>
      </div>
      <div className="w-full flex gap-3">
        <TasksTotalOverview />
        <QuickActionsProjDash />
        {/* <div className="1 h-18 bg-red-300">what you missed</div>
        <div className="2 h-20 bg-red-300">total members</div>
        <div className="3 h-24 bg-red-300">overdue tasks</div>
        <div className="3 h-22 bg-red-300">quick actions</div>
        <div className="3 h-20 bg-red-300">total tasks overview</div> */}
      </div>
    </div>
  );
};

export default ProjectsDashboard;
