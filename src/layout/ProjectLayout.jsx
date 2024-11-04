import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProjectLayout = () => {
    const {userData} = useSelector(state => state.userSlice)
    console.log(userData?.projects)

    // if projects is available then show the project dashboard
    // if the project is not available then show create or join a project hyperlink

    if(userData?.projects) {

        return (
            <div>
this is your project dashboard
        </div>
    );
}  else {
    return (<div className='w-screen h-screen flex items-center justify-center gap-10'>
        <Link to={'/create-project'} className="border border-gray-300 bg-gray-100 hover:bg-blue-200 hover:border-blue-300 duration-700 w-1/5 h-2/3 rounded-3xl grid place-items-center">
            create a project
        </Link>
        <Link to={'/join-project'} className="border border-gray-300 bg-gray-100 hover:bg-blue-200 hover:border-blue-300 duration-700 w-1/5 h-2/3 rounded-3xl grid place-items-center">
            join a project
        </Link>
        
    </div>)
}

};

export default ProjectLayout;