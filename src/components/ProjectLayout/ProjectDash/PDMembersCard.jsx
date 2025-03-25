import avatar from "/avatar/avatar.png";
import PropTypes from "prop-types";

const PDMembersCard = ({image, name, email}) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl p-2 flex  gap-4">
      <img
        className="w-12 h-12 bg-gray-300 rounded-full object-cover"
        src={image || avatar}
        alt="Members Img"
      />
      <div>
        <h3 className="font-[500] ">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

PDMembersCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default PDMembersCard;
