import avatar from "/avatar/avatar.png";

const PDMembersCard = () => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl p-2 flex  gap-4">
      <img
        className="w-12 h-12 bg-gray-300 rounded-full object-cover"
        src={avatar}
        alt="Members Img"
      />
      <div>
        <h3 className="font-[500] ">John Doe</h3>
        <p className="text-sm text-gray-500">Web Developer</p>
      </div>
    </div>
  );
};

export default PDMembersCard;
