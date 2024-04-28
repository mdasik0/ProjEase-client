import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Notification_TabMenu = () => {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

    return (
        <div className="relative ">
              <button
                onClick={() =>
                  setIsNotificationMenuOpen(!isNotificationMenuOpen)
                }
                className={`btn btn-sm text-lg h-8 px-[7px] dark:text-white bg-transparent hover:bg-blue-400 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20 border-none outline-none rounded-full`}
              >
                <BsThreeDotsVertical />
              </button>

              {/* Additional actions menu */}
              {isNotificationMenuOpen && (
                <div className="absolute -left-[160px] shadow-zinc-900 top-1 w-40 bg-zinc-800 border  font-medium justify-start rounded-b-2xl rounded-s-2xl py-3 z-10 shadow-xl">
                  <button className="w-full whitespace-nowrap btn btn-xs bg-transparent text-white rounded-none hover:bg-[#ff5252] hover:text-white shadow-none border-none justify-start pl-3">
                    Mark all as read
                  </button>
                  <button className="w-full whitespace-nowrap btn btn-xs dark:text-white/80 bg-transparent rounded-none hover:bg-[#ff5252] hover:text-white shadow-none border-none justify-start pl-3">
                    Mark all as unread
                  </button>
                  <button className="w-full  whitespace-nowrap btn btn-xs dark:text-white/80  bg-transparent rounded-none hover:bg-[#ff5252] hover:text-white shadow-none border-none justify-start pl-3">
                    Delete all
                  </button>
                </div>
              )}
            </div>
    );
};

export default Notification_TabMenu;