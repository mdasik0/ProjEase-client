import { FiUserPlus } from "react-icons/fi";
import { MdTaskAlt } from "react-icons/md";
import { TbMessageCirclePlus } from "react-icons/tb";
import { Link } from "react-router-dom";

const QuickActionsProjDash = () => {
  return (
    <div className="bg-gray-200 border border-gray-300 rounded-xl h-[290px] p-3 flex flex-col gap-3">
      <h3 className="text-lg font-[500] mb-3">Quick Actions</h3>
      <Link to="/projects/tasks">
      <button className="btn text-gray-200 bg-[#1a1a1a] hover:bg-[#2a2a2a] w-[20rem]  font-normal">
        <span className="flex items-center justify-center gap-3">
        Create New Task <MdTaskAlt className="text-lg" />
        </span>
      </button>
      </Link>
      <Link to={"/projects/invite-members"}>
      <button className="btn text-gray-200 bg-[#1a1a1a] hover:bg-[#2a2a2a] w-[20rem]  font-normal">
        <span className="flex items-center justify-center gap-3">
        Invite Team Member <FiUserPlus className="text-lg" />
        </span>
      </button>
      </Link>
      <Link to="/projects/chats">
      <button className="btn text-gray-200 bg-[#1a1a1a] hover:bg-[#2a2a2a] w-[20rem]  font-normal">
        <span className="flex items-center justify-center gap-3">
        Write a Message <TbMessageCirclePlus className="text-lg" />
        </span>
      </button>
      </Link>
    </div>
  );
};

export default QuickActionsProjDash;
