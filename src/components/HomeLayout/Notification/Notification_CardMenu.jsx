import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Notification_CardMenu = () => {
  const [singleMenu, setSingleMenu] = useState(false);

    return (
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
    );
};

export default Notification_CardMenu;