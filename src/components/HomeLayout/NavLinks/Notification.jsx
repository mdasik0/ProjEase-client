import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from "react-icons/md";

const Notification = () => {
  const notifications = [1,];
  return (
    <div className=" h-[24px] w-[80px] flex flex-col items-center">
      <div className="relative cursor-pointer">
      {notifications ? (
        <MdOutlineNotificationsActive className="text-2xl" />
      ) : (
        <MdOutlineNotifications className="text-2xl" />
      )}
      {notifications && <div className="absolute px-1 -top-1 -right-1 bg-red-500 text-[10px] text-center rounded-lg">{notifications.length}</div>}
      </div>
    </div>
  );
};

export default Notification;
