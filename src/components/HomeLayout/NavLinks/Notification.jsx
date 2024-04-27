import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from "react-icons/md";

const Notification = () => {
  const notifications = true;
  return (
    <div className="relative cursor-pointer">
      {notifications ? (
        <MdOutlineNotificationsActive className="text-2xl" />
      ) : (
        <MdOutlineNotifications className="text-2xl" />
      )}
      {notifications && <div className="absolute px-1 -top-1 -right-1 bg-red-500 text-xs text-center rounded-lg">1</div>}
    </div>
  );
};

export default Notification;
