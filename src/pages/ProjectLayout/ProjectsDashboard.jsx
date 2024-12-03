import { useDispatch, useSelector } from "react-redux";

const ProjectsDashboard = () => {
const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.userSlice)

    console.log();
    const activeProjectId = userData.joinedProjects.find(p => p.status === 'active').projectId;
console.log(activeProjectId);
    // now make a api end point that will find specific project with a project id;



    return (
        <div>
            project dashboard
        </div>
    );
};

export default ProjectsDashboard;