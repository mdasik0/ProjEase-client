import { IoSettingsOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ChatsHeader = ({ members, projectData, openChatSettingModal }) => {
  return (
    <div className="flex items-center justify-between m-6 p-6 bg-gray-200 rounded-xl border text-black border-gray-400 h-28">
      <div>
        <p className=" mb-0.5 uppercase text-sm text-gray-400 font-[500]">
          {projectData?.projectName}/{" "}
          <span className="text-gray-600">group chat</span>
        </p>
        {members?.length <= 5 ? (
          <div className={`grid grid-cols-[repeat(20,20px)] gap-2 flex-grow`}>
            {members?.map((member) => (
              <div
                className="w-12 h-12 border-2 border-white rounded-full tooltip tooltip-top cursor-pointer hover:scale-125 duration-500"
                key={member?._id}
                data-tip={
                  member?.name?.firstname + " " + member?.name?.lastname
                }
              >
                <img
                  className="w-full h-full object-cover rounded-full "
                  src={member?.image}
                  alt={`image of ${
                    member?.name?.firstname + " " + member?.name?.lastname
                  }`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className={`grid grid-cols-[repeat(20,20px)] gap-2 flex-grow`}>
              {members?.slice(0, 3)?.map((member) => (
                <div
                  className="w-12 h-12 border-2 border-white rounded-full tooltip tooltip-top cursor-pointer hover:scale-125 duration-500"
                  key={member?._id}
                  data-tip={
                    member?.name?.firstname + " " + member?.name?.lastname
                  }
                >
                  <img
                    className="w-full h-full object-cover rounded-full "
                    src={member?.image}
                    alt={`image of ${
                      member?.name?.firstname + " " + member?.name?.lastname
                    }`}
                  />
                </div>
              ))}
              <div
                className="w-12 h-12 border-2 border-white rounded-full tooltip tooltip-top cursor-pointer hover:scale-125 duration-500 relative"
                key={members?.length > 4 ? members[4]?._id : null}
                data-tip={
                  members?.length > 4
                    ? `${members[4]?.name?.firstname} ${members[4]?.name?.lastname}`
                    : ""
                }
              >
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={members?.length > 4 ? members[4]?.image : ""}
                  alt={
                    members?.length > 4
                      ? `image of ${members[4]?.name?.firstname} ${members[4]?.name?.lastname}`
                      : ""
                  }
                />
                <div className="w-12 h-12 z-[1] bg-[rgba(0,0,0,0.5)] rounded-full border-2 border-white absolute -top-[2px] -left-[2px]"></div>
                <span className="text-white absolute inset-0 flex items-center justify-center z-[2]">
                  {members?.length > 4 ? members?.length : ""}
                </span>
              </div>

              <Link
                to={"/projects/invite-members"}
                className="bg-green-500 cursor-pointer z-[2] w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white text-2xl hover:scale-125 duration-500 tooltip tooltip-top"
                data-tip="Add"
              >
                <GoPlus />
              </Link>
            </div>
          </div>
        )}
      </div>
      <div>
        <IoSettingsOutline
          onClick={openChatSettingModal}
          className=" p-0 text-2xl hover:rotate-90 duration-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

ChatsHeader.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
      }),
    })
  ),
  projectData: PropTypes.shape({
    projectName: PropTypes.string,
  }),
  openChatSettingModal: PropTypes.func.isRequired,
};

export default ChatsHeader;
