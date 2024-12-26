import { BiErrorCircle } from "react-icons/bi";
import TitleandSub from "../../ProjectLayout/TitleandSub";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

const JoinProject_ERR_int = () => {
    return (
        <div className="p-10 flex flex-col  h-full">
          <TitleandSub
            title={"The Link is Broken"}
            subTitle={"The invitation link entered may has been cancelled"}
          />
          <div className="flex flex-col justify-center items-center gap-6 flex-grow">
            <BiErrorCircle className="text-[200px] text-red-400" />
            <p className="text-red-600">Your invitation has been cancelled.</p>
            <Link
              to={"/"}
              className="btn text-gray-200 bg-[#2a2a2a] hover:text-black px-10 mt-4  font-normal"
            >
              Go back to home page
              <IoHomeSharp className="text-lg" />
            </Link>
          </div>
        </div>
    );
};

export default JoinProject_ERR_int;