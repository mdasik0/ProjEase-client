import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdNotificationsActive,
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from "react-icons/md";

const Notification = () => {
  const notifications = [1];
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  const [singleMenu, setSingleMenu] = useState(false);
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

      {notificationsOpen && (
        <div className="absolute overflow-x-hidden overflow-y-auto max-h-[500px] top-[70px] right-10 transform  duration-200 border dark:border-darkThree rounded-xl   w-60 md:w-80 shadow-2xl  scrollbar-thin z-10">
          {/* Header of the notification popup */}
          <div className="sticky top-0 right-0 w-full flex items-center justify-between px-4 py-2 border-b-2  z-20">
            <h2 className="font-semibold">Notifications</h2>

            {/* Dropdown menu for additional actions */}
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
          </div>

          {/* Display individual notifications */}

          <div className="flex flex-col gap-3 px-3 py-1 my-1">
            <div
              className={`relative bg-zinc-800
                   w-full rounded-xl cursor-pointer p-3`}
            >
              <div>
                <div className="flex gap-4 ">
                  <div className=" ">
                    <MdNotificationsActive className="w-7 h-7 " />
                  </div>
                  <div className="xl:w-44 flex-1">
                    <h2 className="font-semibold  pr-10 pb-1 ">
                      asik@gmali.com
                    </h2>
                    <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                      this is the description of the message
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <p className="text-gray-600 dark:text-darkGray text-[10px] flex items-center justify-end gap-3">
                    {/* Date */}
                    <span>24 - 04 - 2024</span>
                    {/* Time */}
                    <span>09: 03 pm</span>
                  </p>
                </div>
              </div>

              {/* Actions menu for each notification */}
              <div className="absolute top-2 right-1.5 z-10">
                <button
                  onClick={() => {
                    setSingleMenu(!singleMenu);
                  }}
                  className={`btn btn-sm px-2 dark:text-white bg-transparent hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20 border-none outline-none rounded-full`}
                >
                  <BsThreeDotsVertical />
                </button>

                {/* Additional actions menu for each notification */}
                {singleMenu && (
                  <div className="absolute right-8 top-0 w-32 bg-zinc-800 border  border-zinc-200 dark:border-darkThree font-medium justify-start rounded-b-2xl rounded-s-2xl py-2 shadow-xl">
                    <button className="w-full whitespace-nowrap btn btn-xs dark:text-white/80 bg-transparent rounded-none hover:bg-[#ff5252] hover:text-white shadow-none border-none justify-start pl-3">
                      Mark as read
                    </button>
                    <button className="w-full whitespace-nowrap btn btn-xs dark:text-white/80 bg-transparent rounded-none hover:bg-[#ff5252] hover:text-white shadow-none border-none justify-start pl-3">
                      Mark as unread
                    </button>
                    <button className="w-full btn btn-xs dark:text-white/80  bg-transparent rounded-none hover:bg-[#ff5252] hover:text-white shadow-none border-none justify-start pl-3">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* // Display message when there are no notifications */}

          {
            notifications.length === 0 && <div className="py-10 z-0">
            <h2 className="text-center">No notification yet . . .</h2>
          </div>
          }
          <div className="sticky bottom-0 w-full bg-transparent py-[6px] z-20"></div>
        </div>
      )}
    </>
  );
};

export default Notification;
