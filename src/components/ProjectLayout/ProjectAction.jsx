import { Link } from "react-router-dom";

const ProjectAction = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center gap-10'>
        <Link to={'/create-project'} className="border border-gray-300 bg-gray-100 hover:bg-blue-200 hover:border-blue-300 duration-700 w-1/5 h-2/3 rounded-3xl grid place-items-center">
            create a project
        </Link>
        <Link to={'/join-project'} className="border border-gray-300 bg-gray-100 hover:bg-blue-200 hover:border-blue-300 duration-700 w-1/5 h-2/3 rounded-3xl grid place-items-center">
            join a project
        </Link>
        
    </div>
    );
};

export default ProjectAction;