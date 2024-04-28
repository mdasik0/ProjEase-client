import { useState } from "react";
import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import Notification_Tab from "../Notification/Notification_Tab";

const Notification = () => {
  const notifications = [1];
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <div className=" h-[24px] w-[80px] flex flex-col items-center">
        <div
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative cursor-pointer"
        >
          {notificationsOpen ? (
            <MdOutlineNotificationsActive className="text-2xl" />
          ) : (
            <MdOutlineNotifications className="text-2xl" />
          )}
          {notifications && (
            <div className="absolute px-1 -top-1 -right-1 bg-red-500 text-[10px] text-center rounded-lg">
              <span className="text-white">{notifications.length}</span>
            </div>
          )}
        </div>
      </div>

      {notificationsOpen && <Notification_Tab notifications={notifications} />}
    </>
  );
};

export default Notification;
