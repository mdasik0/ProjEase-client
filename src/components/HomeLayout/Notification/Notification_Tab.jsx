import PropTypes from "prop-types";
import Notification_Card from "./Notification_Card";
import Notification_TabMenu from "./Notification_TabMenu";

const Notification_Tab = ({ notifications }) => {
  return (
    <div className="absolute overflow-x-hidden overflow-y-auto max-h-[300px] top-[70px] right-10 transform  duration-200 border dark:border-darkThree rounded-xl  w-60 md:w-80 shadow-2xl  scrollbar-thin z-10">
      {/* Header of the notification popup */}
      <div className="sticky top-0 right-0 w-full flex items-center justify-between px-4 py-2 border-b-2  z-20">
        <h2 className="font-semibold">Notifications</h2>

        {/* Dropdown menu for additional actions */}
        <Notification_TabMenu />
      </div>

      {/* Display individual notifications */}

      <div className="flex flex-col gap-3 px-3 py-1 my-1">
        <Notification_Card />
        <Notification_Card />
        <Notification_Card />
        <Notification_Card />
        <Notification_Card />
      </div>

      {/* // Display message when there are no notifications */}

      {notifications.length === 0 && (
        <div className="py-10 z-0">
          <h2 className="text-center">No notification yet . . .</h2>
        </div>
      )}
      <div className="sticky bottom-0 w-full bg-transparent py-[6px] z-20"></div>
    </div>
  );
};

Notification_Tab.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Define other propTypes for each notification property as needed
    })
  ).isRequired,
};

export default Notification_Tab;
